import Form from 'next/form';
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
    return (
        <Form action='/search'>
            <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Search className='h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors' />
                </div>
                <input
                    type='text'
                    name='query'
                    placeholder='Search products...'
                    className='w-40 sm:w-48 pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm focus:shadow-md'
                />
            </div>
        </Form>
    );
};

export default SearchBar;
