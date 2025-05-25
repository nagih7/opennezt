// Audio utility functions
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { execSync } from 'child_process'
import { v4 as uuidv4 } from 'uuid'
import os from 'os'

// Configure ffmpeg path - use system ffmpeg
const ffmpegPath = '/usr/bin/ffmpeg'
ffmpeg.setFfmpegPath(ffmpegPath)

/**
 * Helper function to clean up temporary files
 * @param {Object} files - Object containing paths to temp files
 */
function cleanupTempFiles(files) {
   try {
      Object.values(files).forEach((file) => {
         if (fs.existsSync(file)) fs.unlinkSync(file)
      })
   } catch (err) {
      console.error('Error cleaning up temp files:', err)
   }
}

/**
 * Verifies if audio file contains human voice by analyzing amplitude, frequency patterns,
 * and spectral characteristics to distinguish from other sounds like clapping
 * @param {string} audioFilePath - Path to audio file
 * @returns {Promise<boolean>} - True if human voice is detected, false otherwise
 */
const verifyVoice = (audioFilePath) => {
   return new Promise((resolve) => {
      try {
         // Check if file exists and is accessible
         if (!fs.existsSync(audioFilePath)) {
            console.error('Audio file not found:', audioFilePath)
            return resolve(false)
         }

         // Generate temporary files with unique names to avoid conflicts
         const tempDir = os.tmpdir()
         const fileId = uuidv4().substring(0, 8)
         const tempFiles = {
            normalizedAudioPath: path.join(tempDir, `normalized_${fileId}.wav`),
            tempOutputFile: path.join(tempDir, `analysis_${fileId}.json`),
            spectralDataFile: path.join(tempDir, `spectral_${fileId}.txt`),
         }

         // Get audio file info using ffprobe (part of ffmpeg)
         ffmpeg.ffprobe(audioFilePath, (err, metadata) => {
            if (err) {
               cleanupTempFiles(tempFiles)
               return resolve(false)
            }

            // Get audio stream info
            const audioStreams = metadata.streams.filter((stream) => stream.codec_type === 'audio')
            if (audioStreams.length === 0) {
               console.error('No audio streams found in file')
               cleanupTempFiles(tempFiles)
               return resolve(false)
            }

            const audioStream = audioStreams[0]
            console.log('Audio file format:', audioStream.codec_name)
            console.log('Duration:', metadata.format.duration, 'seconds')
            console.log('Bit rate:', metadata.format.bit_rate, 'bits/s')

            // Start analysis pipeline
            normalizeAudio(audioFilePath, tempFiles.normalizedAudioPath)
               .then(() => analyzeVolumeAndSilence(tempFiles.normalizedAudioPath, tempFiles.tempOutputFile))
               .then(({ meanVolume, maxVolume, silenceRatio, silencePeriods }) => {
                  // Run the other analyses in parallel
                  return Promise.all([
                     Promise.resolve({ meanVolume, maxVolume, silenceRatio, silencePeriods }),
                     analyzeFrequencyDistribution(tempFiles.normalizedAudioPath, tempFiles.spectralDataFile),
                     analyzeRhythmPatterns(tempFiles.normalizedAudioPath),
                  ])
               })
               .then(([volumeData, frequencyData, rhythmPatterns]) => {
                  // Get total duration from metadata
                  const totalDuration = parseFloat(metadata.format.duration) || 0

                  // Log all analysis results
                  console.log('Audio analysis results:')
                  console.log('Mean volume:', volumeData.meanVolume, 'dB')
                  console.log('Max volume:', volumeData.maxVolume, 'dB')
                  console.log('Silence ratio:', volumeData.silenceRatio * 100, '%')
                  console.log('Silence periods:', volumeData.silencePeriods)
                  console.log('Speech frequency ratio:', frequencyData.speechFrequencyRatio)
                  console.log('Frequency variation:', frequencyData.frequencyVariation)
                  console.log('Rhythm regularity:', rhythmPatterns.rhythmRegularity)
                  console.log('Peak count:', rhythmPatterns.peakCount)

                  // Advanced voice detection using multiple factors:
                  // 1. Basic volume checks (as before)
                  // 2. Frequency distribution should match human speech
                  // 3. Pattern analysis should indicate organic speech vs regular patterns
                  const isHumanVoice =
                     // Volume checks (similar to before)
                     volumeData.meanVolume > -35 && // Not too quiet overall
                     volumeData.maxVolume > -15 && // Has some louder peaks
                     volumeData.silenceRatio < 0.7 && // Less than 70% silence
                     // Speech frequency characteristics (human speech is complex with variations)
                     frequencyData.speechFrequencyRatio > 0.55 && // Over 55% of energy in speech frequencies
                     frequencyData.frequencyVariation > 0.4 && // High variation in frequencies
                     // Rhythm patterns (speech has irregular patterns, clapping is more regular)
                     (rhythmPatterns.rhythmRegularity < 0.6 || // Less regular patterns
                        (totalDuration > 3 && volumeData.silencePeriods > 5)) // Longer audio with multiple silence periods

                  cleanupTempFiles(tempFiles)
                  resolve(isHumanVoice)
               })
               .catch((error) => {
                  console.error('Error in audio analysis:', error)
                  cleanupTempFiles(tempFiles)
                  resolve(false)
               })
         })
      } catch (err) {
         console.error('Error analyzing audio file:', err)
         resolve(false)
      }
   })
}

/**
 * Normalize audio for consistent analysis
 * @param {string} inputPath - Path to input audio file
 * @param {string} outputPath - Path for normalized output
 * @returns {Promise<void>}
 */
const normalizeAudio = (inputPath, outputPath) => {
   return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
         .outputOptions([
            // Convert to WAV format with consistent parameters
            '-ac 1', // Mono
            '-ar 16000', // 16kHz sample rate
            '-acodec pcm_s16le', // 16-bit PCM
         ])
         .output(outputPath)
         .on('error', (err) => {
            console.error('Error normalizing audio:', err.message)
            reject(err)
         })
         .on('end', () => {
            resolve()
         })
         .run()
   })
}

/**
 * Analyze volume levels and silence periods in audio
 * @param {string} audioPath - Path to audio file
 * @param {string} tempOutputFile - Path for temporary output
 * @returns {Promise<Object>} - Volume and silence metrics
 */
const analyzeVolumeAndSilence = (audioPath, tempOutputFile) => {
   return new Promise((resolve, reject) => {
      ffmpeg(audioPath)
         .audioFilters([
            // Detect silence where signal level is below -30dB for at least 0.5 seconds
            'silencedetect=noise=-30dB:d=0.5',
            // Analyze volume levels
            'volumedetect',
         ])
         .output(tempOutputFile)
         .outputOptions('-f', 'null')
         .on('error', (err) => {
            console.error('Error during audio analysis:', err.message)
            reject(err)
         })
         .on('end', (stdout, stderr) => {
            try {
               // Parse the stderr for volumedetect and silencedetect output
               const volumeMatch = stderr.match(/mean_volume:\s*([-\d.]+)\s*dB/)
               const maxVolumeMatch = stderr.match(/max_volume:\s*([-\d.]+)\s*dB/)
               const silenceMatches = Array.from(
                  stderr.matchAll(
                     /silence_start:\s*([-\d.]+)[\s\S]*?silence_end:\s*([-\d.]+)\s*\|\s*silence_duration:\s*([-\d.]+)/g
                  )
               )

               // Extract key metrics
               const meanVolume = volumeMatch ? parseFloat(volumeMatch[1]) : -100
               const maxVolume = maxVolumeMatch ? parseFloat(maxVolumeMatch[1]) : -100

               // Calculate total silence duration
               let totalSilence = 0
               let silencePeriods = 0
               for (const match of silenceMatches) {
                  const duration = parseFloat(match[3])
                  totalSilence += duration
                  silencePeriods++
               }

               // Parse duration from stderr
               const durationMatch = stderr.match(/Duration: (\d{2}):(\d{2}):(\d{2})\.(\d{2})/)
               let totalDuration = 0
               if (durationMatch) {
                  const hours = parseInt(durationMatch[1], 10)
                  const minutes = parseInt(durationMatch[2], 10)
                  const seconds = parseInt(durationMatch[3], 10)
                  const hundredths = parseInt(durationMatch[4], 10)
                  totalDuration = hours * 3600 + minutes * 60 + seconds + hundredths / 100
               }

               // Calculate silence ratio (percentage of silence in the audio)
               const silenceRatio = totalDuration > 0 ? totalSilence / totalDuration : 1

               resolve({
                  meanVolume,
                  maxVolume,
                  silenceRatio,
                  silencePeriods,
                  totalDuration,
               })
            } catch (error) {
               console.error('Error parsing audio analysis:', error)
               reject(error)
            }
         })
         .run()
   })
}

/**
 * Analyze frequency distribution to identify human speech characteristics
 * @param {string} audioPath - Path to audio file
 * @param {string} outputFile - Path for frequency analysis output
 * @returns {Promise<Object>} - Frequency analysis metrics
 */
const analyzeFrequencyDistribution = (audioPath, outputFile) => {
   return new Promise((resolve) => {
      try {
         // Use FFmpeg to create spectrum analysis
         ffmpeg(audioPath)
            .outputOptions([
               // Generate frequency spectrum data
               '-af "astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level"',
               '-f null',
            ])
            .output(outputFile)
            .on('error', (err) => {
               console.error('Error analyzing frequency:', err.message)
               resolve({
                  speechFrequencyRatio: 0,
                  frequencyVariation: 0,
               })
            })
            .on('end', () => {
               try {
                  // Run a more detailed FFT analysis using ffprobe
                  const ffprobeCmd = `"${ffmpegInstaller.path}" -i "${audioPath}" -af "bandpass=f=1000:width_type=h:w=2000,highpass=f=300,lowpass=f=3000" -f null -`
                  const speechBandResult = execSync(ffprobeCmd, { encoding: 'utf8', stdio: 'pipe' })

                  // Also analyze full spectrum for comparison
                  const ffprobeFullCmd = `"${ffmpegInstaller.path}" -i "${audioPath}" -f null -`
                  const fullSpectrumResult = execSync(ffprobeFullCmd, { encoding: 'utf8', stdio: 'pipe' })

                  // Extract speech frequencies (typically 300-3000 Hz for human voice)
                  const speechEnergyMatch = speechBandResult.match(/avg_level:\s*([-\d.]+)\s*dB/)
                  const fullSpectrumMatch = fullSpectrumResult.match(/avg_level:\s*([-\d.]+)\s*dB/)

                  let speechFrequencyRatio = 0.3 // Default low value
                  let frequencyVariation = 0.2 // Default low value

                  if (speechEnergyMatch && fullSpectrumMatch) {
                     // Calculate ratio of energy in speech band vs. full spectrum
                     const speechEnergy = parseFloat(speechEnergyMatch[1])
                     const fullEnergy = parseFloat(fullSpectrumMatch[1])

                     // Normalize ratio to 0-1 range
                     speechFrequencyRatio = Math.min(Math.max(speechEnergy / fullEnergy + 1, 0), 1)

                     // Calculate variation based on spectral flatness
                     // Higher values indicate more speech-like (varied) frequencies
                     const variationMatches = speechBandResult.match(/(?:flatness|variation):\s*([-\d.]+)/g)
                     if (variationMatches && variationMatches.length > 0) {
                        const variations = variationMatches.map((m) => parseFloat(m.split(':')[1]))
                        frequencyVariation = variations.reduce((sum, val) => sum + val, 0) / variations.length

                        // Normalize to 0-1 range
                        frequencyVariation = Math.min(Math.max(frequencyVariation, 0), 1)
                     }
                  } else {
                     // Alternative analysis if the previous method fails
                     // Estimate based on waveform peaks and distribution
                     try {
                        const altCmd = `"${ffmpegInstaller.path}" -i "${audioPath}" -af "astats=metadata=1:reset=1" -f null -`
                        const altResult = execSync(altCmd, { encoding: 'utf8', stdio: 'pipe' })

                        // Check for varied peak distribution
                        const peakMatches = altResult.match(/Peak_level:\s*([-\d.]+)/g)
                        if (peakMatches && peakMatches.length > 3) {
                           const peaks = peakMatches.map((m) => parseFloat(m.split(':')[1]))

                           // Calculate standard deviation of peaks
                           const avg = peaks.reduce((sum, val) => sum + val, 0) / peaks.length
                           const variance = peaks.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / peaks.length
                           const stdDev = Math.sqrt(variance)

                           // Higher variation indicates more speech-like content
                           frequencyVariation = Math.min(stdDev / 20, 1)

                           // Estimate speech ratio based on number of unique peaks
                           const uniquePeaks = new Set(peaks.map((p) => Math.round(p))).size
                           speechFrequencyRatio = Math.min(uniquePeaks / 8, 1)
                        }
                     } catch (e) {
                        console.error('Alternative frequency analysis failed:', e)
                     }
                  }

                  resolve({
                     speechFrequencyRatio,
                     frequencyVariation,
                  })
               } catch (err) {
                  console.error('Error in frequency analysis:', err)
                  resolve({
                     speechFrequencyRatio: 0.3,
                     frequencyVariation: 0.2,
                  })
               }
            })
            .run()
      } catch (err) {
         console.error('Error setting up frequency analysis:', err)
         resolve({
            speechFrequencyRatio: 0.3,
            frequencyVariation: 0.2,
         })
      }
   })
}

/**
 * Analyze rhythm patterns to detect regular patterns (like clapping) vs. irregular patterns (like speech)
 * @param {string} audioPath - Path to audio file
 * @returns {Promise<Object>} - Rhythm analysis metrics
 */
const analyzeRhythmPatterns = (audioPath) => {
   return new Promise((resolve) => {
      try {
         // Use FFmpeg to extract amplitude peaks over time
         const cmd = `"${ffmpegInstaller.path}" -i "${audioPath}" -af "compand=0|0:1|1:-90/-900|-70/-70|-30/-9|0/-3:6:0:0:0,highpass=f=200,lowpass=f=3000" -f null -`
         const result = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' })

         // Parse peak data from the output
         const peakMatches = result.match(/lvl=\s*([-\d.]+)/g)

         if (peakMatches && peakMatches.length > 0) {
            const peaks = peakMatches.map((m) => parseFloat(m.split('=')[1]))

            // Extract rhythm by finding the time between peaks
            const peakIndices = []
            let prevVal = -100

            for (let i = 0; i < peaks.length; i++) {
               // Peak is defined as a value higher than threshold followed by a lower value
               if (peaks[i] > -15 && peaks[i] > prevVal) {
                  peakIndices.push(i)
               }
               prevVal = peaks[i]
            }

            // Calculate intervals between peaks
            const intervals = []
            for (let i = 1; i < peakIndices.length; i++) {
               intervals.push(peakIndices[i] - peakIndices[i - 1])
            }

            // Calculate regularity - standard deviation of intervals
            // Low variance = more regular = more likely to be clapping or mechanical sounds
            let rhythmRegularity = 0.8 // Default high (regular) value
            const peakCount = peakIndices.length

            if (intervals.length > 2) {
               const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length
               const intervalVariance =
                  intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length
               const intervalStdDev = Math.sqrt(intervalVariance)

               // Calculate coefficient of variation (normalized standard deviation)
               const cv = intervalStdDev / avgInterval

               // Speech has higher variation (lower regularity)
               // Clapping/regular sounds have lower variation (higher regularity)
               rhythmRegularity = Math.max(0, Math.min(1, 1 - cv))
            }

            resolve({
               rhythmRegularity,
               peakCount,
            })
         } else {
            // If no peaks detected, give a neutral result
            resolve({
               rhythmRegularity: 0.5,
               peakCount: 0,
            })
         }
      } catch (err) {
         console.error('Error analyzing rhythm patterns:', err)
         resolve({
            rhythmRegularity: 0.5,
            peakCount: 0,
         })
      }
   })
}

export default verifyVoice
