
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePrev = () => onPageChange(Math.max(1, currentPage - 1));
    const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return [...new Set(pages)];
    };
    
    const pages = getPageNumbers();

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16">
            <div className="flex items-center gap-2">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiChevronLeft />
                    Anterior
                </button>

                <div className="hidden md:flex items-center gap-2">
                    {pages.map((page, index) =>
                        typeof page === 'number' ? (
                            <button
                                key={`${page}-${index}`}
                                onClick={() => onPageChange(page)}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    currentPage === page
                                        ? 'bg-brand-accent text-brand-primary shadow'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                }`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={`ellipsis-${index}`} className="px-4 py-2 text-sm font-medium text-gray-500">
                                {page}
                            </span>
                        )
                    )}
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                    <FiChevronRight />
                </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
                Página <span className="font-semibold">{currentPage}</span> de <span className="font-semibold">{totalPages}</span>
            </div>
        </div>
    );
};

export default Pagination;
