import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    if (totalPages < 2) return null;

    return (
        <div className="flex justify-center mt-4">
            <nav>
                <ul className="pagination flex">
                    <li className={`mx-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <button
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                            className="px-3 py-1 border rounded"
                            disabled={currentPage === 1}
                        >
                            &laquo;
                        </button>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className="mx-1">
                            <button
                                onClick={() => onPageChange(number + 1)}
                                className={`px-3 py-1 border rounded ${currentPage === number + 1 ? 'bg-surface2 text-text' : ''}`}
                                disabled={currentPage === number + 1}
                            >
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`mx-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <button
                            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                            className="px-3 py-1 border rounded"
                            disabled={currentPage === totalPages}
                        >
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
