import React from 'react'
import Style from './FilterBar.module.css'

export default function FilterBar({ searchTerm, setSearchTerm, minAmount, setMinAmount, maxAmount, setMaxAmount }) {
    
return (
    <>
        <div className={Style.filterBar}>
            <input
                className="form-control me-2 mb-3 ms-auto"
                type="search"
                placeholder="Search by name"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className='mb-1 fw-bolder ms-5'>Search by amount</p>
            <div className='d-flex ms-auto'>
                <input
                    className="form-control me-2"
                    type="number"
                    placeholder="Min amount"
                    aria-label="Search"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                />
                <input
                    className="form-control me-2"
                    type="number"
                    placeholder="Max amount"
                    aria-label="Search"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                />
            </div>
        </div>
    </>
)
}








