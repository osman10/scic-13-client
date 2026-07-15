"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { IoListSharp, IoSearchOutline } from 'react-icons/io5';
import { FaGlobe, FaTag, FaSort } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';



type ClientPaginatedItemsProps = {
    items: any[];
    itemsPerPage?: number;
};

const ClientPaginatedItems = ({ items, itemsPerPage = 8, }: ClientPaginatedItemsProps) => {
    const [itemOffset, setItemOffset] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All countries');
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [sortBy, setSortBy] = useState('Newest');
    
    

    // Get unique countries and categories for filter dropdowns
    const countries = ['All countries', ...new Set(items.map(item => item.country))];
    const categories = ['All categories', ...new Set(items.map(item => item.catagory))];
    const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Rating'];

    // Filter and sort items
    const filteredItems = items.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.subTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.experience?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.country?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCountry = selectedCountry === 'All countries' || item.country === selectedCountry;
        const matchesCategory = selectedCategory === 'All categories' || item.catagory === selectedCategory;

        return matchesSearch && matchesCountry && matchesCategory;
    });

    // Sort items
    const sortedItems = [...filteredItems].sort((a, b) => {
        switch (sortBy) {
            case 'Price: Low to High':
                return a.price - b.price;
            case 'Price: High to Low':
                return b.price - a.price;
            case 'Rating':
                return b.rating - a.rating;
            case 'Newest':
            default:
                // Assuming newer items have higher index or use _id
                return b._id?.localeCompare(a._id) || 0;
        }
    });

    // Calculate current items to display
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = sortedItems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(sortedItems.length / itemsPerPage);


    // Handle page click
    // Handle page click
    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % sortedItems.length;

        setItemOffset(newOffset);

        // Scroll to top when page changes
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    const handleFilterChange = (callback: () => unknown) => {
        callback();
        setItemOffset(0);
    };

    // If no items, show empty state
    if (!items || items.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No experiences found.</p>
            </div>
        );
    }

    return (
        <>
            {/* Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Find your next trip</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Every experience is hosted by a local. Filter by what matters to you.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col lg:flex-row gap-3">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                        <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Kyoto, safari, glacier..."
                            value={searchTerm}
                            onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Country Filter */}
                    <div className="relative min-w-[180px]">
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={selectedCountry}
                            onChange={(e) => handleFilterChange(() => setSelectedCountry(e.target.value))}
                            className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                        >
                            {countries.map((country, idx) => (
                                <option key={idx} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className="relative min-w-[180px]">
                        <FaTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleFilterChange(() => setSelectedCategory(e.target.value))}
                            className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                        >
                            {categories.map((category, idx) => (
                                <option key={idx} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="relative min-w-[160px]">
                        <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={sortBy}
                            onChange={(e) => handleFilterChange(() => setSortBy(e.target.value))}
                            className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
                        >
                            {sortOptions.map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Active filters count */}
                {(searchTerm || selectedCountry !== 'All countries' || selectedCategory !== 'All categories') && (
                    <div className="mt-4 flex items-center flex-wrap gap-2">
                        <span className="text-sm text-gray-500">
                            Showing {sortedItems.length} results
                        </span>
                        {searchTerm && (
                            <span className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                Search: "{searchTerm}"
                                <button
                                    onClick={() => handleFilterChange(() => setSearchTerm(''))}
                                    className="hover:text-blue-900"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {selectedCountry !== 'All countries' && (
                            <span className="inline-flex items-center gap-1 text-sm bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                {selectedCountry}
                                <button
                                    onClick={() => handleFilterChange(() => setSelectedCountry('All countries'))}
                                    className="hover:text-green-900"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {selectedCategory !== 'All categories' && (
                            <span className="inline-flex items-center gap-1 text-sm bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                                {selectedCategory}
                                <button
                                    onClick={() => handleFilterChange(() => setSelectedCategory('All categories'))}
                                    className="hover:text-purple-900"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Show items info */}
            <div className="text-md text-gray-500 mt-4 flex items-center gap-1 py-4">
                <IoListSharp /> Showing {currentItems.length} of {sortedItems.length} experiences
            </div>

            {/* Display items in a responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentItems.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        {/* Image */}
                        {item.image && (
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title || 'Experience'}
                                    className="w-full h-56 object-cover"
                                />
                                {/* Location Badge */}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.country || 'Location'}
                                    </span>
                                </div>
                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                    <span className="text-yellow-500">★</span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {item.rating || '0.0'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-5">
                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {item.title || `Experience ${index + 1}`}
                            </h3>

                            {/* Subtitle */}
                            <p className="text-sm text-gray-500 mb-3">
                                {item.subTitle || item.experience || 'No description available'}
                            </p>

                            {/* Category / Duration Tag */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                    {item.catagory || 'Experience'}
                                </span>
                                {item.duration && (
                                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                        {item.duration}
                                    </span>
                                )}
                            </div>

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div>
                                    <span className="text-xs text-gray-400">from</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-green-600">
                                            ${item.price || '0'}
                                        </span>
                                        {item.duration && (
                                            <span className="text-xs text-gray-400">
                                                /{item.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <Link href={`explore/${item._id}`} className="bg-[#154b4e]  hover:bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination - Only show if more than 1 page */}
            {pageCount > 1 && (
                <div className="flex flex-col items-center mt-10">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="< Previous"
                        renderOnZeroPageCount={null}
                        containerClassName="flex items-center gap-2 flex-wrap justify-center"
                        pageClassName="px-3 py-2 rounded-md hover:bg-orange-500 transition-colors cursor-pointer bg-[#154b4e] text-white"
                        activeClassName="bg-orange-500 text-white hover:bg-orange-500"
                        previousClassName="px-3 py-2 rounded-md hover:bg-orange-500 transition-colors cursor-pointer bg-[#154b4e] text-white"
                        nextClassName="px-3 py-2 rounded-md hover:bg-orange-500 transition-colors cursor-pointer bg-[#154b4e] text-white"
                        disabledClassName="opacity-50 cursor-not-allowed bg-[#8aa8aa] text-gray-200"
                        breakClassName="px-3 py-2 text-[#154b4e]"
                    />
                </div>
            )}
        </>
    );
};

export default ClientPaginatedItems;