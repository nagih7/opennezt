import React from 'react'
import { render, screen } from '@testing-library/react'
import Card from './index'

describe('Card Component', () => {
   // Test default rendering
   test('renders card with default props', () => {
      render(
         <Card>
            <div data-testid="card-content">Content</div>
         </Card>
      )

      const content = screen.getByTestId('card-content')
      expect(content).toBeInTheDocument()

      const cardElement = content.parentElement
      expect(cardElement).toHaveClass('bg-white', 'border-gray-200', 'p-4')
   })

   // Test with different variants
   test('renders card with primary variant', () => {
      render(
         <Card variant="primary">
            <div data-testid="card-content">Content</div>
         </Card>
      )

      const content = screen.getByTestId('card-content')
      const cardElement = content.parentElement
      expect(cardElement).toHaveClass('bg-blue-50', 'border-blue-100')
      expect(cardElement).not.toHaveClass('bg-white', 'border-gray-200')
   })

   test('renders card with secondary variant', () => {
      render(
         <Card variant="secondary">
            <div data-testid="card-content">Content</div>
         </Card>
      )

      const content = screen.getByTestId('card-content')
      const cardElement = content.parentElement
      expect(cardElement).toHaveClass('bg-gray-50', 'border-gray-100')
      expect(cardElement).not.toHaveClass('bg-white', 'border-gray-200')
   })

   // Test with different sizes
   test('renders card with small size', () => {
      render(
         <Card size="sm">
            <div data-testid="card-content">Content</div>
         </Card>
      )

      const content = screen.getByTestId('card-content')
      const cardElement = content.parentElement
      expect(cardElement).toHaveClass('p-2')
      expect(cardElement).not.toHaveClass('p-4', 'p-6')
   })

   test('renders card with large size', () => {
      render(
         <Card size="lg">
            <div data-testid="card-content">Content</div>
         </Card>
      )

      const content = screen.getByTestId('card-content')
      const cardElement = content.parentElement
      expect(cardElement).toHaveClass('p-6')
      expect(cardElement).not.toHaveClass('p-4', 'p-2')
   })

   // Test custom className
   test('renders card with custom className', () => {
      render(
         <Card className="custom-class">
            <div data-testid="card-content">Content</div>
         </Card>
      )

      const content = screen.getByTestId('card-content')
      const cardElement = content.parentElement
      expect(cardElement).toHaveClass('custom-class')
   })

   // Test compound components
   test('renders Card with Header, Body, and Footer components', () => {
      render(
         <Card>
            <Card.Header data-testid="card-header">Header</Card.Header>
            <Card.Body data-testid="card-body">Body</Card.Body>
            <Card.Footer data-testid="card-footer">Footer</Card.Footer>
         </Card>
      )

      const header = screen.getByTestId('card-header')
      const body = screen.getByTestId('card-body')
      const footer = screen.getByTestId('card-footer')

      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent('Header')
      expect(header).toHaveClass('border-b')

      expect(body).toBeInTheDocument()
      expect(body).toHaveTextContent('Body')
      expect(body).toHaveClass('p-4')

      expect(footer).toBeInTheDocument()
      expect(footer).toHaveTextContent('Footer')
      expect(footer).toHaveClass('border-t')
   })

   // Test Header with different variants
   test('renders Header with primary variant', () => {
      render(
         <Card variant="primary">
            <Card.Header data-testid="card-header">Header</Card.Header>
         </Card>
      )

      const header = screen.getByTestId('card-header')
      expect(header).toHaveClass('border-blue-100')
      expect(header).not.toHaveClass('border-gray-200')
   })

   // Test Body with different sizes
   test('renders Body with small size', () => {
      render(
         <Card size="sm">
            <Card.Body data-testid="card-body">Body</Card.Body>
         </Card>
      )

      const body = screen.getByTestId('card-body')
      expect(body).toHaveClass('p-2')
      expect(body).not.toHaveClass('p-4', 'p-6')
   })

   // Test Footer with custom className
   test('renders Footer with custom className', () => {
      render(
         <Card>
            <Card.Footer data-testid="card-footer" className="custom-footer">
               Footer
            </Card.Footer>
         </Card>
      )

      const footer = screen.getByTestId('card-footer')
      expect(footer).toHaveClass('custom-footer')
   })
})
