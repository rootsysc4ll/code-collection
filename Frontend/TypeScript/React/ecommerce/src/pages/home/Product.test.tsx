import { describe, it, vi, expect } from 'vitest'
import type { Mock } from 'vitest';
import { screen, render } from '@testing-library/react'
import Product from './Product'
import type { ProductType } from '../../utils/types';

describe('testing Product component', () => {
    let product: ProductType;
    let loadCart: Mock;

    beforeEach(() => {
        product = {
            id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
            image: "images/products/kitchen-paper-towels-8-pack.jpg",
            name: "2-Ply Kitchen Paper Towels - 8 Pack",
            rating: {
                stars: 4.5,
                count: 1045
            },
            priceCents: 1899,
            keywords: ["kitchen", "kitchen towels", "tissues"],
            createdAt: 'pog',
            updatedAt: 'gop'
        }
        loadCart = vi.fn()
    })

    it('displays the correct info', () => {
        render(<Product product={product} loadCart={loadCart} />)

        expect(
            screen.getByText('2-Ply Kitchen Paper Towels - 8 Pack')
        ).toBeInTheDocument()

        expect(
            screen.getByTestId('product-rating-stars')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')

        expect(
            screen.getByText('$18.99')
        ).toBeInTheDocument()
    })
})