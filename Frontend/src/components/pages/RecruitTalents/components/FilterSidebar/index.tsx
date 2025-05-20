import React, { useEffect, useState } from 'react'
import SelectCustom from 'components/UI/SelectCustom'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '~/store/hooks'
import {
   getCategoryFramework,
   getExperienceLevelFramwork,
   getIndustryFramework,
   getSkillFramework,
   getSubCategoryFramework,
} from 'api/user'
import { recruitTalents } from 'api/talent'
import { setFormRecruitTalents } from 'store/modules/talent'
import InputCustom from 'components/UI/InputCustom'
import { FormRecruitTalents, SelectEvent } from '../../types'
import { RootState } from '~/store'

interface DataFilter extends FormRecruitTalents {}

const FilterSidebar: React.FC = () => {
   const dispatch = useAppDispatch()

   const { industryFramework, experienceLevelFramework, categoryFramework, subCategoryFramework, skillFramework } =
      useSelector((state: RootState) => state.user)
   const { formRecruitTalents } = useSelector((state: RootState) => state.talent)

   const [inputTimer, setInputTimer] = useState<NodeJS.Timeout | null>(null)
   const [dataFilter, setDataFilter] = useState<DataFilter>({
      keySearch: '',
      industry: '',
      experienceLevel: '',
      category: '',
      subcategory: '',
      skill: '',
      page: 1,
      perPage: 6,
   })

   useEffect(() => {
      dispatch(
         recruitTalents({
            ...formRecruitTalents,
            page: 1,
            perPage: 6,
         })
      )
      setDataFilter(formRecruitTalents)
   }, [dispatch, formRecruitTalents])

   useEffect(() => {
      if (industryFramework?.items?.length === 0) {
         dispatch(getIndustryFramework())
      }
   }, [dispatch, industryFramework])

   useEffect(() => {
      if (experienceLevelFramework?.items?.length === 0) {
         dispatch(getExperienceLevelFramwork())
      }
   }, [dispatch, experienceLevelFramework])

   useEffect(() => {
      if (categoryFramework?.items?.length === 0) {
         dispatch(getCategoryFramework())
      }
   }, [dispatch, categoryFramework])

   const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setDataFilter((prev) => ({
         ...prev,
         [event.target.name]: newValue,
      }))

      if (inputTimer) {
         clearTimeout(inputTimer)
      }

      setInputTimer(
         setTimeout(() => {
            const updatedForm = {
               ...formRecruitTalents,
               keySearch: newValue,
               page: 1,
               perPage: 6,
            }
            dispatch(setFormRecruitTalents({ event }))
            dispatch(recruitTalents(updatedForm))
         }, 300)
      )
   }

   const handleChangeSelect = async (event: SelectEvent, nameSelect: keyof FormRecruitTalents) => {
      setDataFilter({ ...dataFilter, [nameSelect]: event.value[0] })
      dispatch(setFormRecruitTalents({ event, nameSelect }))

      switch (nameSelect) {
         case 'category':
            dispatch(getSubCategoryFramework(event.value[0]))
            break
         case 'subcategory':
            dispatch(getSkillFramework(event.value[0]))
            break
         default:
            break
      }
      dispatch(
         recruitTalents({
            ...formRecruitTalents,
            [nameSelect]: event.value[0],
            page: 1,
            perPage: 6,
         })
      )
   }

   return (
      <>
         <div className="bg-[#ffffff] rounded-md mb-8">
            <InputCustom
               height="40px"
               placeholder="Search by name, email, etc."
               value={dataFilter.keySearch}
               onChange={handleChangeInput}
               label="Search"
               name="keySearch"
            />
         </div>
         {industryFramework?.items?.length > 0 && (
            <div className="bg-[#ffffff] rounded-md mb-8">
               <SelectCustom
                  onChange={(e: SelectEvent) => handleChangeSelect(e, 'industry')}
                  height="40px"
                  collection={industryFramework}
                  name="industry"
                  label="Industry"
                  value={[formRecruitTalents.industry]}
               />
            </div>
         )}
         {experienceLevelFramework?.items?.length > 0 && (
            <div className="bg-[#ffffff] rounded-md mb-8">
               <SelectCustom
                  onChange={(e: SelectEvent) => handleChangeSelect(e, 'experienceLevel')}
                  height="40px"
                  collection={experienceLevelFramework}
                  name="experienceLevel"
                  label="Experience Level"
                  value={[formRecruitTalents.experienceLevel]}
               />
            </div>
         )}
         {categoryFramework?.items?.length > 0 && (
            <div className="bg-[#ffffff] rounded-md mb-8">
               <SelectCustom
                  onChange={(e: SelectEvent) => handleChangeSelect(e, 'category')}
                  height="40px"
                  collection={categoryFramework}
                  name="category"
                  label="Category"
                  value={[formRecruitTalents.category]}
               />
            </div>
         )}
         {subCategoryFramework?.items?.length > 0 && (
            <div className="bg-[#ffffff] rounded-md mb-8">
               <SelectCustom
                  onChange={(e: SelectEvent) => handleChangeSelect(e, 'subcategory')}
                  height="40px"
                  collection={subCategoryFramework}
                  name="subcategory"
                  label="Sub Category"
                  value={[formRecruitTalents.subcategory]}
               />
            </div>
         )}
         {skillFramework?.items?.length > 0 && (
            <div className="bg-[#ffffff] rounded-md mb-8">
               <SelectCustom
                  onChange={(e: SelectEvent) => handleChangeSelect(e, 'skill')}
                  height="40px"
                  collection={skillFramework}
                  name="skill"
                  label="Skill"
                  value={[formRecruitTalents.skill]}
               />
            </div>
         )}
      </>
   )
}

export default FilterSidebar
