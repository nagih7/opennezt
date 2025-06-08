import { renderHook, act } from '@testing-library/react'
import { useInfiniteScroll } from '../useInfiniteScroll'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('useInfiniteScroll', () => {
  const mockOnLoadMore = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return lastElementRef function', () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    )

    expect(result.current.lastElementRef).toBeInstanceOf(Function)
  })

  it('should create IntersectionObserver when node is provided and hasMore is true', () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    )

    const mockElement = document.createElement('div')
    
    act(() => {
      result.current.lastElementRef(mockElement)
    })

    expect(mockIntersectionObserver).toHaveBeenCalled()
  })

  it('should not create IntersectionObserver when hasMore is false', () => {
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: false,
        isLoading: false,
        onLoadMore: mockOnLoadMore,
      })
    )

    const mockElement = document.createElement('div')
    
    act(() => {
      result.current.lastElementRef(mockElement)
    })

    expect(mockIntersectionObserver).not.toHaveBeenCalled()
  })
})
