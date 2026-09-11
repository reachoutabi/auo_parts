/**
 * AutoParts Pro - Product Catalog Filtering, Sorting & Dynamic Pagination
 * Controls faceted sidebar filtering, grid/list view toggling, price slider, and interactive pagination.
 */

window.AutoPartsCatalog = {
    filters: {
        category: '',
        brand: '',
        vehicleType: '',
        minPrice: 0,
        maxPrice: 1000,
        inStockOnly: false,
        flashSaleOnly: false,
        minRating: 0,
        searchQuery: '',
        sort: 'featured'
    },
    currentView: 'grid', // 'grid' or 'list'
    currentPage: 1,
    itemsPerPage: 6, // 6 items per page for clear multi-page pagination

    init() {
        this.parseUrlParams();
        this.bindFilterEvents();
        this.updateCategoryCounts();
        this.renderCatalog();
    },

    updateCategoryCounts() {
        if (!window.AutoPartsData || !window.AutoPartsData.products) return;
        const products = window.AutoPartsData.products;
        const catCounts = {};
        products.forEach(p => {
            if (p.categoryId) {
                catCounts[p.categoryId] = (catCounts[p.categoryId] || 0) + 1;
            }
        });

        document.querySelectorAll('[data-category-count]').forEach(el => {
            const cat = el.getAttribute('data-category-count');
            const count = catCounts[cat] || 0;
            el.textContent = count;
        });

        const flashSaleCountEl = document.getElementById('catalog-flashsale-count');
        if (flashSaleCountEl) {
            flashSaleCountEl.textContent = products.filter(p => p.isDeal).length;
        }
    },

    parseUrlParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('category')) this.filters.category = params.get('category');
        if (params.get('brand')) this.filters.brand = params.get('brand');
        if (params.get('vehicleType')) this.filters.vehicleType = params.get('vehicleType');
        if (params.get('search')) this.filters.searchQuery = params.get('search');
        if (params.get('deal') === 'true' || params.get('flashSale') === 'true') this.filters.flashSaleOnly = true;
        if (params.get('page')) this.currentPage = parseInt(params.get('page'), 10) || 1;
    },

    bindFilterEvents() {
        // Search Input
        const searchInput = document.getElementById('catalog-search-input');
        if (searchInput) {
            searchInput.value = this.filters.searchQuery;
            searchInput.addEventListener('input', (e) => {
                this.filters.searchQuery = e.target.value.toLowerCase().trim();
                this.currentPage = 1;
                this.renderCatalog();
            });
        }

        // Sort Select
        const sortSelect = document.getElementById('catalog-sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sort = e.target.value;
                this.currentPage = 1;
                this.renderCatalog();
            });
        }

        // View Mode Toggles
        const btnGrid = document.getElementById('btn-view-grid');
        const btnList = document.getElementById('btn-view-list');
        if (btnGrid && btnList) {
            btnGrid.addEventListener('click', () => {
                this.currentView = 'grid';
                btnGrid.classList.add('bg-red-600', 'text-white');
                btnGrid.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
                btnList.classList.remove('bg-red-600', 'text-white');
                btnList.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
                this.renderCatalog();
            });

            btnList.addEventListener('click', () => {
                this.currentView = 'list';
                btnList.classList.add('bg-red-600', 'text-white');
                btnList.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
                btnGrid.classList.remove('bg-red-600', 'text-white');
                btnGrid.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
                this.renderCatalog();
            });
        }

        // Price Range Slider
        const priceRange = document.getElementById('catalog-price-range');
        const priceDisplay = document.getElementById('catalog-price-display');
        if (priceRange && priceDisplay) {
            priceRange.addEventListener('input', (e) => {
                this.filters.maxPrice = parseFloat(e.target.value);
                priceDisplay.textContent = `$${this.filters.maxPrice}`;
                this.currentPage = 1;
                this.renderCatalog();
            });
        }

        // In Stock Checkbox
        const stockCheckbox = document.getElementById('catalog-instock-checkbox');
        if (stockCheckbox) {
            stockCheckbox.addEventListener('change', (e) => {
                this.filters.inStockOnly = e.target.checked;
                this.currentPage = 1;
                this.renderCatalog();
            });
        }

        // Flash Sale Checkbox
        const flashSaleCheckbox = document.getElementById('catalog-flashsale-checkbox');
        if (flashSaleCheckbox) {
            flashSaleCheckbox.checked = this.filters.flashSaleOnly;
            flashSaleCheckbox.addEventListener('change', (e) => {
                this.filters.flashSaleOnly = e.target.checked;
                this.currentPage = 1;
                this.renderCatalog();
            });
        }
    },

    setCategory(categoryId) {
        this.filters.category = this.filters.category === categoryId ? '' : categoryId;
        this.currentPage = 1;
        this.updateActiveFilterUI();
        this.renderCatalog();
    },

    setBrand(brandId) {
        this.filters.brand = this.filters.brand === brandId ? '' : brandId;
        this.currentPage = 1;
        this.updateActiveFilterUI();
        this.renderCatalog();
    },

    setVehicleType(typeId) {
        this.filters.vehicleType = this.filters.vehicleType === typeId ? '' : typeId;
        this.currentPage = 1;
        this.updateActiveFilterUI();
        this.renderCatalog();
    },

    toggleFlashSale(forceState) {
        this.filters.flashSaleOnly = typeof forceState === 'boolean' ? forceState : !this.filters.flashSaleOnly;
        const flashSaleCheckbox = document.getElementById('catalog-flashsale-checkbox');
        if (flashSaleCheckbox) flashSaleCheckbox.checked = this.filters.flashSaleOnly;
        this.currentPage = 1;
        this.updateActiveFilterUI();
        this.renderCatalog();
    },

    resetAllFilters() {
        this.filters = {
            category: '',
            brand: '',
            vehicleType: '',
            minPrice: 0,
            maxPrice: 1000,
            inStockOnly: false,
            flashSaleOnly: false,
            minRating: 0,
            searchQuery: '',
            sort: 'featured'
        };
        this.currentPage = 1;

        const searchInput = document.getElementById('catalog-search-input');
        if (searchInput) searchInput.value = '';
        const priceRange = document.getElementById('catalog-price-range');
        if (priceRange) priceRange.value = 1000;
        const priceDisplay = document.getElementById('catalog-price-display');
        if (priceDisplay) priceDisplay.textContent = '$1000';
        const stockCheckbox = document.getElementById('catalog-instock-checkbox');
        if (stockCheckbox) stockCheckbox.checked = false;
        const flashSaleCheckbox = document.getElementById('catalog-flashsale-checkbox');
        if (flashSaleCheckbox) flashSaleCheckbox.checked = false;

        this.updateActiveFilterUI();
        this.renderCatalog();
    },

    updateActiveFilterUI() {
        // Highlight active filter category pills
        document.querySelectorAll('.js-filter-category-btn').forEach(btn => {
            const cat = btn.getAttribute('data-category');
            if (cat === this.filters.category) {
                btn.classList.add('bg-red-600', 'text-white');
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-700/60', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200', 'dark:text-slate-300');
            } else {
                btn.classList.remove('bg-red-600', 'text-white');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-700/60', 'text-slate-700', 'dark:text-slate-200');
            }
        });

        // Highlight active brand filter buttons
        document.querySelectorAll('.js-filter-brand-btn').forEach(btn => {
            const brand = btn.getAttribute('data-brand');
            if (brand === this.filters.brand) {
                btn.classList.add('bg-red-600', 'text-white');
                btn.classList.remove('bg-slate-100', 'dark:bg-slate-700/60', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-200', 'dark:text-slate-300');
            } else {
                btn.classList.remove('bg-red-600', 'text-white');
                btn.classList.add('bg-slate-100', 'dark:bg-slate-700/60', 'text-slate-700', 'dark:text-slate-200');
            }
        });

        // Sync flash sale checkbox
        const flashSaleCheckbox = document.getElementById('catalog-flashsale-checkbox');
        if (flashSaleCheckbox) {
            flashSaleCheckbox.checked = this.filters.flashSaleOnly;
        }

        const flashSaleContainer = document.getElementById('catalog-flashsale-container');
        if (flashSaleContainer) {
            if (this.filters.flashSaleOnly) {
                flashSaleContainer.classList.add('bg-amber-500/20', 'border-amber-500', 'ring-2', 'ring-amber-500/30');
            } else {
                flashSaleContainer.classList.remove('bg-amber-500/20', 'border-amber-500', 'ring-2', 'ring-amber-500/30');
            }
        }
    },

    getFilteredProducts() {
        let list = [...window.AutoPartsData.products];

        // Search Query
        if (this.filters.searchQuery) {
            const q = this.filters.searchQuery;
            list = list.filter(p => 
                p.name.toLowerCase().includes(q) ||
                p.sku.toLowerCase().includes(q) ||
                p.oem.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        // Category Filter
        if (this.filters.category) {
            list = list.filter(p => p.categoryId === this.filters.category || p.category.toLowerCase().includes(this.filters.category.toLowerCase()));
        }

        // Brand Filter
        if (this.filters.brand) {
            list = list.filter(p => p.brandId === this.filters.brand || p.brand.toLowerCase().includes(this.filters.brand.toLowerCase()));
        }

        // Vehicle Type Filter
        if (this.filters.vehicleType) {
            list = list.filter(p => p.vehicleType === this.filters.vehicleType);
        }

        // Price Filter
        list = list.filter(p => p.price <= this.filters.maxPrice);

        // Stock Filter
        if (this.filters.inStockOnly) {
            list = list.filter(p => p.stockStatus === 'In Stock');
        }

        // Flash Sale Filter
        if (this.filters.flashSaleOnly) {
            list = list.filter(p => p.isDeal);
        }

        // Sorting
        if (this.filters.sort === 'price-low') {
            list.sort((a, b) => a.price - b.price);
        } else if (this.filters.sort === 'price-high') {
            list.sort((a, b) => b.price - a.price);
        } else if (this.filters.sort === 'rating') {
            list.sort((a, b) => b.rating - a.rating);
        } else if (this.filters.sort === 'name') {
            list.sort((a, b) => a.name.localeCompare(b.name));
        }

        return list;
    },

    goToPage(pageNum) {
        this.currentPage = pageNum;
        this.renderCatalog();

        const grid = document.getElementById('catalog-products-grid');
        if (grid) {
            grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    renderPagination(totalCount, totalPages) {
        const paginationContainer = document.getElementById('catalog-pagination-container');
        if (!paginationContainer) return;

        if (totalCount === 0) {
            paginationContainer.innerHTML = '';
            return;
        }

        // Ensure currentPage bounds
        if (this.currentPage > totalPages) this.currentPage = totalPages;
        if (this.currentPage < 1) this.currentPage = 1;

        // Previous button
        const hasPrev = this.currentPage > 1;
        const prevButtonHtml = hasPrev
            ? `<button type="button" onclick="AutoPartsCatalog.goToPage(${this.currentPage - 1})" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all font-bold text-xs flex items-center justify-center shadow-sm" title="Previous Page" aria-label="Previous Page">
                <i class="fa-solid fa-chevron-left"></i>
               </button>`
            : `<button type="button" disabled class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200/50 dark:border-slate-800 cursor-not-allowed select-none opacity-40 line-through flex items-center justify-center text-xs" title="No Previous Page" aria-label="No Previous Page">
                <i class="fa-solid fa-chevron-left"></i>
               </button>`;

        // Page number buttons
        let pageNumbersHtml = '';
        for (let p = 1; p <= totalPages; p++) {
            if (p === this.currentPage) {
                pageNumbersHtml += `
                    <button type="button" class="w-10 h-10 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center shadow-lg shadow-red-600/30 ring-2 ring-red-600/20" title="Current Page ${p}" aria-current="page">
                        ${p}
                    </button>
                `;
            } else {
                pageNumbersHtml += `
                    <button type="button" onclick="AutoPartsCatalog.goToPage(${p})" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 font-bold text-xs flex items-center justify-center transition-all shadow-sm" title="Go to Page ${p}">
                        ${p}
                    </button>
                `;
            }
        }

        // When there is NO 2nd page (totalPages === 1), display a disabled 2nd page button with strikethrough and dull color as requested
        if (totalPages === 1) {
            pageNumbersHtml += `
                <button type="button" disabled class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200/40 dark:border-slate-800/50 cursor-not-allowed select-none opacity-40 line-through font-bold text-xs flex items-center justify-center" title="Page 2 Unavailable (No more parts)">
                    2
                </button>
            `;
        }

        // Next button
        const hasNext = this.currentPage < totalPages;
        const nextButtonHtml = hasNext
            ? `<button type="button" onclick="AutoPartsCatalog.goToPage(${this.currentPage + 1})" class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all font-bold text-xs flex items-center justify-center shadow-sm" title="Next Page" aria-label="Next Page">
                <i class="fa-solid fa-chevron-right"></i>
               </button>`
            : `<button type="button" disabled class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 border border-slate-200/50 dark:border-slate-800 cursor-not-allowed select-none opacity-40 line-through flex items-center justify-center text-xs" title="No Next Page Available" aria-label="No Next Page Available">
                <i class="fa-solid fa-chevron-right"></i>
               </button>`;

        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalCount);

        paginationContainer.innerHTML = `
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-8 border-t border-slate-200/80 dark:border-slate-700 mt-8">
                <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Showing <span class="font-bold text-slate-900 dark:text-white">${startItem}–${endItem}</span> of <span class="font-bold text-slate-900 dark:text-white">${totalCount}</span> catalogued parts
                    <span class="text-slate-400 ms-1">(Page ${this.currentPage} of ${totalPages})</span>
                </div>
                <div class="flex items-center gap-2">
                    ${prevButtonHtml}
                    ${pageNumbersHtml}
                    ${nextButtonHtml}
                </div>
            </div>
        `;
    },

    renderCatalog() {
        const container = document.getElementById('catalog-products-grid');
        const countDisplay = document.getElementById('catalog-results-count');
        if (!container) return;

        const products = this.getFilteredProducts();
        const totalPages = Math.ceil(products.length / this.itemsPerPage) || 1;

        if (countDisplay) {
            countDisplay.textContent = `Showing ${products.length} of ${window.AutoPartsData.products.length} parts`;
        }

        if (products.length === 0) {
            container.className = "col-span-full";
            container.innerHTML = `
                <div class="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                    <div class="w-16 h-16 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        <i class="fa-solid fa-magnifying-glass-chart"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">No Parts Match Your Filter Criteria</h3>
                    <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">Try broadening your search query, increasing the price range, or clearing active category filters.</p>
                    <button type="button" onclick="AutoPartsCatalog.resetAllFilters()" class="px-6 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                        Reset All Filters
                    </button>
                </div>
            `;
            this.renderPagination(0, 1);
            return;
        }

        // Slice products for current page
        const paginatedProducts = products.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);

        if (this.currentView === 'grid') {
            container.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 justify-center justify-items-center w-full max-w-full";
            container.innerHTML = paginatedProducts.map(p => (window.AutoPartsUI && window.AutoPartsUI.renderProductCardHtml) ? window.AutoPartsUI.renderProductCardHtml(p) : '').join('');
        } else {
            container.className = "space-y-4 max-w-4xl mx-auto w-full";
            container.innerHTML = paginatedProducts.map(p => (window.AutoPartsUI && window.AutoPartsUI.renderProductListRowHtml) ? window.AutoPartsUI.renderProductListRowHtml(p) : '').join('');
        }

        // Render dynamic interactive pagination
        this.renderPagination(products.length, totalPages);

        if (window.AutoPartsUI && window.AutoPartsUI.updateWishlistButtons) {
            window.AutoPartsUI.updateWishlistButtons();
        }
    }
};

// Initialize Catalog on DOMContentLoaded if catalog grid is present
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('catalog-products-grid')) {
        window.AutoPartsCatalog.init();
    }
});
