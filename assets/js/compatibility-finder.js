/**
 * AutoParts Pro - Compatibility Finder Logic
 * Controls dynamic vehicle Make -> Model -> Year -> Engine cascading dropdowns,
 * compatibility filtering, and fitment indicators across the storefront.
 */

window.AutoPartsCompatibility = {
    init() {
        this.bindSelectors();
        this.loadSavedVehicle();
    },

    bindSelectors() {
        const vehicleForms = document.querySelectorAll('.js-vehicle-selector-form');
        vehicleForms.forEach(form => {
            const makeSelect = form.querySelector('.js-make-select');
            const modelSelect = form.querySelector('.js-model-select');
            const yearSelect = form.querySelector('.js-year-select');
            const engineSelect = form.querySelector('.js-engine-select');
            const submitBtn = form.querySelector('.js-search-vehicle-btn');

            if (!makeSelect || !modelSelect || !yearSelect) return;

            // Populate Makes
            this.populateMakes(makeSelect);

            makeSelect.addEventListener('change', (e) => {
                const make = e.target.value;
                this.populateModels(modelSelect, yearSelect, engineSelect, make);
            });

            modelSelect.addEventListener('change', (e) => {
                const make = makeSelect.value;
                const model = e.target.value;
                this.populateYears(yearSelect, engineSelect, make, model);
            });

            yearSelect.addEventListener('change', (e) => {
                const make = makeSelect.value;
                const model = modelSelect.value;
                const year = e.target.value;
                this.populateEngines(engineSelect, make, model, year);
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const vehicleObj = {
                    make: makeSelect.value,
                    model: modelSelect.value,
                    year: yearSelect.value,
                    engine: engineSelect ? engineSelect.value : ''
                };
                if (!vehicleObj.make || !vehicleObj.model || !vehicleObj.year) {
                    if (window.AutoPartsUI) {
                        window.AutoPartsUI.showToast('Please select Make, Model, and Year', 'warning');
                    }
                    return;
                }
                window.AutoPartsStore.saveVehicle(vehicleObj);
                
                // Redirect to compatibility page or products page with vehicle parameters
                if (window.location.pathname.indexOf('compatibility-finder.html') === -1) {
                    window.location.href = `products.html?make=${encodeURIComponent(vehicleObj.make)}&model=${encodeURIComponent(vehicleObj.model)}&year=${encodeURIComponent(vehicleObj.year)}`;
                } else {
                    this.renderCompatibilityResults(vehicleObj);
                }
            });
        });
    },

    populateMakes(makeSelect) {
        makeSelect.innerHTML = '<option value="">1. Select Make</option>';
        const makes = Object.keys(window.AutoPartsData.vehicles);
        makes.forEach(make => {
            const opt = document.createElement('option');
            opt.value = make;
            opt.textContent = make;
            makeSelect.appendChild(opt);
        });
    },

    populateModels(modelSelect, yearSelect, engineSelect, make) {
        modelSelect.innerHTML = '<option value="">2. Select Model</option>';
        modelSelect.disabled = !make;
        yearSelect.innerHTML = '<option value="">3. Select Year</option>';
        yearSelect.disabled = true;
        if (engineSelect) {
            engineSelect.innerHTML = '<option value="">4. Select Engine (Optional)</option>';
            engineSelect.disabled = true;
        }

        if (!make || !window.AutoPartsData.vehicles[make]) return;

        const models = Object.keys(window.AutoPartsData.vehicles[make].models);
        models.forEach(model => {
            const opt = document.createElement('option');
            opt.value = model;
            opt.textContent = model;
            modelSelect.appendChild(opt);
        });
    },

    populateYears(yearSelect, engineSelect, make, model) {
        yearSelect.innerHTML = '<option value="">3. Select Year</option>';
        yearSelect.disabled = !model;
        if (engineSelect) {
            engineSelect.innerHTML = '<option value="">4. Select Engine (Optional)</option>';
            engineSelect.disabled = true;
        }

        if (!make || !model || !window.AutoPartsData.vehicles[make]?.models[model]) return;

        const years = window.AutoPartsData.vehicles[make].models[model].years;
        // Reverse so recent years appear first
        [...years].reverse().forEach(year => {
            const opt = document.createElement('option');
            opt.value = year;
            opt.textContent = year;
            yearSelect.appendChild(opt);
        });
    },

    populateEngines(engineSelect, make, model, year) {
        if (!engineSelect) return;
        engineSelect.innerHTML = '<option value="">4. Select Engine (Optional)</option>';
        engineSelect.disabled = !year;

        if (!make || !model || !window.AutoPartsData.vehicles[make]?.models[model]) return;

        const engines = window.AutoPartsData.vehicles[make].models[model].engines;
        engines.forEach(engine => {
            const opt = document.createElement('option');
            opt.value = engine;
            opt.textContent = engine;
            engineSelect.appendChild(opt);
        });
    },

    loadSavedVehicle() {
        const vehicle = window.AutoPartsStore.getSavedVehicle();
        this.updateHeaderVehicleBadge(vehicle);

        if (document.getElementById('compatibility-results-container')) {
            if (vehicle && vehicle.make) {
                this.renderCompatibilityResults(vehicle);
            } else {
                this.renderDefaultExplorer();
            }
        }
    },

    updateHeaderVehicleBadge(vehicle) {
        const badges = document.querySelectorAll('.js-header-vehicle-badge');
        badges.forEach(badge => {
            if (vehicle && vehicle.make) {
                badge.innerHTML = `
                    <div class="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs font-semibold">
                        <i class="fa-solid fa-circle-check text-emerald-500"></i>
                        <span>${vehicle.year} ${vehicle.make} ${vehicle.model}</span>
                        <button type="button" onclick="AutoPartsStore.clearSavedVehicle()" class="hover:text-red-500 transition-colors ms-1" title="Clear Vehicle">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                `;
            } else {
                badge.innerHTML = `
                    <a href="compatibility-finder.html" class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                        <i class="fa-solid fa-car text-blue-600 dark:text-blue-400"></i>
                        <span>Select Your Vehicle</span>
                    </a>
                `;
            }
        });
    },

    checkProductFitment(product, vehicle) {
        if (!vehicle || !vehicle.make) return { fits: null, text: "Check fitment" };
        
        const match = product.compatibility.some(c => {
            const makeMatch = c.make.toLowerCase() === vehicle.make.toLowerCase();
            const modelMatch = vehicle.model ? c.model.toLowerCase().includes(vehicle.model.toLowerCase()) || vehicle.model.toLowerCase().includes(c.model.toLowerCase()) : true;
            return makeMatch && modelMatch;
        });

        if (match) {
            return {
                fits: true,
                text: `Fits your ${vehicle.year} ${vehicle.make} ${vehicle.model}`
            };
        } else {
            return {
                fits: false,
                text: `Does NOT fit ${vehicle.make} ${vehicle.model}`
            };
        }
    },

    renderCompatibilityResults(vehicleObj) {
        const resultsContainer = document.getElementById('compatibility-results-container');
        if (!resultsContainer) return;

        const matchedProducts = window.AutoPartsData.products.filter(product => {
            return this.checkProductFitment(product, vehicleObj).fits;
        });

        if (matchedProducts.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
                    <div class="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">No Exact Matching Parts Found</h3>
                    <p class="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">We couldn't find catalog parts explicitly mapped to ${vehicleObj.year} ${vehicleObj.make} ${vehicleObj.model}. Try searching by part category or contact our parts specialists for custom sourcing.</p>
                    <div class="flex flex-wrap items-center justify-center gap-4">
                        <button type="button" onclick="AutoPartsCompatibility.resetFinder()" class="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold hover:bg-slate-200 transition-colors">Reset Search</button>
                        <a href="contact.html" class="px-5 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">Request Part Sourcing</a>
                    </div>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = `
            <div class="mb-6 flex items-center justify-between gap-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-xl">
                <div class="flex items-center gap-3" dir="ltr">
                    <div class="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                        <i class="fa-solid fa-car"></i>
                    </div>
                    <div dir="ltr">
                        <h4 class="font-bold text-slate-900 dark:text-white">Compatible Parts for ${vehicleObj.year} ${vehicleObj.make} ${vehicleObj.model} ${vehicleObj.engine ? '(' + vehicleObj.engine + ')' : ''}</h4>
                        <p class="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Found ${matchedProducts.length} verified OE & aftermarket compatible parts</p>
                    </div>
                </div>
                <button type="button" onclick="AutoPartsCompatibility.resetFinder()" class="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors flex-shrink-0">Change Vehicle</button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center justify-items-center">
                ${matchedProducts.map(p => (window.AutoPartsUI && window.AutoPartsUI.renderProductCardHtml) ? window.AutoPartsUI.renderProductCardHtml(p) : '').join('')}
            </div>
        `;
    },

    resetFinder() {
        AutoPartsStore.clearSavedVehicle();
        const resultsContainer = document.getElementById('compatibility-results-container');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
        const forms = document.querySelectorAll('.js-vehicle-selector-form');
        forms.forEach(form => form.reset());
        this.renderDefaultExplorer();
    },

    selectQuickVehicle(make, model, year, engine) {
        const vehicleObj = { make, model, year, engine };
        window.AutoPartsStore.saveVehicle(vehicleObj);
        this.renderCompatibilityResults(vehicleObj);
        
        // Update form selects
        const form = document.querySelector('.js-vehicle-selector-form');
        if (form) {
            const makeSelect = form.querySelector('.js-make-select');
            const modelSelect = form.querySelector('.js-model-select');
            const yearSelect = form.querySelector('.js-year-select');
            const engineSelect = form.querySelector('.js-engine-select');

            if (makeSelect) {
                makeSelect.value = make;
                this.populateModels(modelSelect, yearSelect, engineSelect, make);
            }
            if (modelSelect) {
                modelSelect.value = model;
                this.populateYears(yearSelect, engineSelect, make, model);
            }
            if (yearSelect) {
                yearSelect.value = year;
                this.populateEngines(engineSelect, make, model, year);
            }
            if (engineSelect && engine) {
                engineSelect.value = engine;
            }
        }
    },

    renderDefaultExplorer() {
        const resultsContainer = document.getElementById('compatibility-results-container');
        if (!resultsContainer) return;

        resultsContainer.innerHTML = `
            <div class="space-y-12">
                <!-- Popular Vehicle Models with Images -->
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 dark:text-white">Popular Vehicles in Our Catalog</h3>
                            <p class="text-xs text-slate-500">Click any vehicle to instantly check compatible parts</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div onclick="AutoPartsCompatibility.selectQuickVehicle('Toyota', 'Camry', '2018', '3.5L V6')" class="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-xl transition-all duration-300">
                            <div class="h-36 overflow-hidden relative bg-slate-900">
                                <img src="assets/images/parts/spark-plugs.jpg" alt="Toyota Camry Parts" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                <span class="absolute bottom-2 left-3 text-xs font-black text-white">Toyota Camry (2018-2024)</span>
                            </div>
                            <div class="p-4 flex items-center justify-between">
                                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">3.5L V6 / 2.5L</span>
                                <span class="text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">Filter Parts &rarr;</span>
                            </div>
                        </div>

                        <div onclick="AutoPartsCompatibility.selectQuickVehicle('Honda', 'Civic', '2020', '2.0L Type R Turbo')" class="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-xl transition-all duration-300">
                            <div class="h-36 overflow-hidden relative bg-slate-900">
                                <img src="assets/images/parts/brake-pads.jpg" alt="Honda Civic Parts" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                <span class="absolute bottom-2 left-3 text-xs font-black text-white">Honda Civic (2016-2024)</span>
                            </div>
                            <div class="p-4 flex items-center justify-between">
                                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">1.5L / 2.0L Type R</span>
                                <span class="text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">Filter Parts &rarr;</span>
                            </div>
                        </div>

                        <div onclick="AutoPartsCompatibility.selectQuickVehicle('Ford', 'F-150', '2021', '3.5L EcoBoost V6')" class="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-xl transition-all duration-300">
                            <div class="h-36 overflow-hidden relative bg-slate-900">
                                <img src="assets/images/parts/turbocharger.jpg" alt="Ford F-150 Parts" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                <span class="absolute bottom-2 left-3 text-xs font-black text-white">Ford F-150 (2018-2024)</span>
                            </div>
                            <div class="p-4 flex items-center justify-between">
                                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">3.5L EcoBoost / 5.0L V8</span>
                                <span class="text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">Filter Parts &rarr;</span>
                            </div>
                        </div>

                        <div onclick="AutoPartsCompatibility.selectQuickVehicle('BMW', '3 Series (F30/G20)', '2022', '3.0L M340i B58')" class="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-xl transition-all duration-300">
                            <div class="h-36 overflow-hidden relative bg-slate-900">
                                <img src="assets/images/parts/suspension.jpg" alt="BMW 3 Series Parts" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                <span class="absolute bottom-2 left-3 text-xs font-black text-white">BMW 3 Series (2016-2024)</span>
                            </div>
                            <div class="p-4 flex items-center justify-between">
                                <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">330i B48 / M340i B58</span>
                                <span class="text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">Filter Parts &rarr;</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vehicle Body Categories with Images -->
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-black text-slate-900 dark:text-white">Shop Parts by Vehicle Body Type</h3>
                            <p class="text-xs text-slate-500">Select your vehicle silhouette</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        <a href="products.html" class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-lg transition-all text-center p-3">
                            <div class="h-24 rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-700">
                                <img src="assets/images/parts/brake-rotors.jpg" alt="Sedan Parts" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                            </div>
                            <h4 class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-red-600">Sedan & Coupe</h4>
                            <span class="text-[10px] text-slate-400 font-semibold">12,400+ SKUs</span>
                        </a>

                        <a href="products.html" class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-lg transition-all text-center p-3">
                            <div class="h-24 rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-700">
                                <img src="assets/images/parts/suspension.jpg" alt="SUV Parts" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                            </div>
                            <h4 class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-red-600">SUV & Crossover</h4>
                            <span class="text-[10px] text-slate-400 font-semibold">18,200+ SKUs</span>
                        </a>

                        <a href="products.html" class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-lg transition-all text-center p-3">
                            <div class="h-24 rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-700">
                                <img src="assets/images/parts/turbocharger.jpg" alt="Truck Parts" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                            </div>
                            <h4 class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-red-600">Pickup Truck</h4>
                            <span class="text-[10px] text-slate-400 font-semibold">9,100+ SKUs</span>
                        </a>

                        <a href="products.html" class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-lg transition-all text-center p-3">
                            <div class="h-24 rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-700">
                                <img src="assets/images/parts/clutch-kit.jpg" alt="Hatchback Parts" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                            </div>
                            <h4 class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-red-600">Hatchback</h4>
                            <span class="text-[10px] text-slate-400 font-semibold">6,500+ SKUs</span>
                        </a>

                        <a href="products.html" class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700 hover:border-red-600 hover:shadow-lg transition-all text-center p-3">
                            <div class="h-24 rounded-xl overflow-hidden mb-2 bg-slate-100 dark:bg-slate-700">
                                <img src="assets/images/parts/alternator.jpg" alt="Commercial Van" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
                            </div>
                            <h4 class="font-bold text-xs text-slate-900 dark:text-white group-hover:text-red-600">Van & Fleet</h4>
                            <span class="text-[10px] text-slate-400 font-semibold">4,800+ SKUs</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
};

// Event listener for vehicle updates
window.addEventListener('vehicleSaved', (e) => {
    window.AutoPartsCompatibility.updateHeaderVehicleBadge(e.detail);
});
