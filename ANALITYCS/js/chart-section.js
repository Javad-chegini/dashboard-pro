// متغیرهای گلوبال برای نگهداری نمودارها
let revenueChart = null;
let productDistributionChart = null;
let comparisonChart = null;
let trendChart = null;

// تنظیمات پیش‌فرض Chart.js
Chart.defaults.font.family = 'Vazir, Tahoma, Arial';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#6c757d';

// رنگ‌های نمودار
const chartColors = {
    primary: '#0066cc',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#FF9800',
    danger: '#f44336',
    purple: '#9C27B0',
    pink: '#E91E63',
    teal: '#009688'
};

// تابع برای ایجاد گرادیان
function createGradient(ctx, color) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '10');
    return gradient;
}

// راه‌اندازی نمودارها
document.addEventListener('DOMContentLoaded', function() {
    initRevenueChart();
    initProductDistributionChart();
    initComparisonChart();
    initTrendChart();
    initUserRegistrationChart();
    initCustomerReturnChart();
});

function initUserRegistrationChart() {
    const ctx = document.getElementById('userRegistrationChart');
    if (!ctx) return;

    const context = ctx.getContext('2d');

    userRegistrationChart = new Chart(context, {
        type: 'bar',
        data: {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
            datasets: [{
                label: 'کاربران جدید',
                data: [245, 312, 287, 402, 365, 410, 380, 425, 398],
                backgroundColor: createGradient(context, chartColors.info),
                borderColor: chartColors.info,
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return 'کاربران جدید: ' + context.parsed.y.toLocaleString('fa-IR') + ' نفر';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('fa-IR');
                        }
                    }
                }
            }
        }
    });
}

function initCustomerReturnChart() {
    const ctx = document.getElementById('customerReturnChart');
    if (!ctx) return;

    const context = ctx.getContext('2d');

    customerReturnChart = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: ['مشتریان جدید', 'مشتریان بازگشتی'],
            datasets: [{
                data: [65, 35],
                backgroundColor: [
                    chartColors.primary,
                    chartColors.success
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 13
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            return label + ': ' + value + '%';
                        }
                    }
                }
            },
            cutout: '60%',
            rotation: -90,
            circumference: 180
        }
    });

    // اضافه کردن متن در وسط
    addCenterText(customerReturnChart, '35%', 'نرخ بازگشت');
}

function addCenterText(chart, mainText, subText) {
    const canvas = chart.canvas;
    const ctx = chart.ctx;

    chart.config.options.plugins.tooltip.events = ['mousemove', 'mouseout'];
    
    chart.config.options.plugins = chart.config.options.plugins || {};
    chart.config.options.plugins.centerText = {
        afterDraw: function(chart) {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;
            
            ctx.restore();
            
            // متن اصلی
            ctx.font = 'bold 24px Vazir';
            ctx.fillStyle = chartColors.primary;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(mainText, width / 2, height / 2 - 10);
            
            // متن فرعی
            ctx.font = '12px Vazir';
            ctx.fillStyle = '#6c757d';
            ctx.fillText(subText, width / 2, height / 2 + 15);
            
            ctx.save();
        }
    };
}

// نمودار فروش و درآمد
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    revenueChart = new Chart(context, {
        type: 'line',
        data: {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
            datasets: [
                {
                    label: 'درآمد (میلیون تومان)',
                    data: [120, 150, 180, 220, 190, 240, 280, 260, 290],
                    borderColor: chartColors.primary,
                    backgroundColor: createGradient(context, chartColors.primary),
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: chartColors.primary,
                    pointBorderWidth: 2
                },
                {
                    label: 'سود (میلیون تومان)',
                    data: [30, 45, 55, 70, 60, 80, 95, 85, 100],
                    borderColor: chartColors.success,
                    backgroundColor: createGradient(context, chartColors.success),
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: chartColors.success,
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 13
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString('fa-IR') + ' میلیون تومان';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('fa-IR');
                        }
                    }
                }
            }
        }
    });
}

function updateUserChart(period) {
    if (!userRegistrationChart) return;

    const data = {
        daily: {
            labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
            data: [45, 52, 38, 65, 48, 72, 35]
        },
        weekly: {
            labels: ['هفته 1', 'هفته 2', 'هفته 3', 'هفته 4'],
            data: [280, 320, 295, 340]
        },
        monthly: {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر'],
            data: [245, 312, 287, 402, 365, 410, 380, 425, 398]
        }
    };

    userRegistrationChart.data.labels = data[period].labels;
    userRegistrationChart.data.datasets[0].data = data[period].data;
    
    // تغییر نوع نمودار بر اساس دوره
    if (period === 'daily') {
        userRegistrationChart.config.type = 'line';
        userRegistrationChart.data.datasets[0].fill = true;
        userRegistrationChart.data.datasets[0].tension = 0.4;
    } else {
        userRegistrationChart.config.type = 'bar';
    }
    
    userRegistrationChart.update();
}

function updateReturnChart(type) {
    if (!customerReturnChart) return;

    // تغییر کلاس active دکمه‌ها
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const data = {
        new: [65, 35],
        returning: [45, 55]
    };

    customerReturnChart.data.datasets[0].data = data[type];
    customerReturnChart.update();

    // به‌روزرسانی متن مرکزی
    const percentage = type === 'new' ? '35%' : '55%';
    addCenterText(customerReturnChart, percentage, 'نرخ بازگشت');
}

// نمودار توزیع محصولات
function initProductDistributionChart() {
    const ctx = document.getElementById('productDistributionChart');
    if (!ctx) return;
    
    const data = {
        labels: ['لپ‌تاپ', 'موبایل', 'تبلت', 'هدفون', 'ساعت هوشمند', 'لوازم جانبی'],
        datasets: [{
            data: [30, 25, 15, 12, 10, 8],
            backgroundColor: [
                chartColors.primary,
                chartColors.success,
                chartColors.warning,
                chartColors.info,
                chartColors.purple,
                chartColors.pink
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    productDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return label + ': ' + percentage + '%';
                        }
                    }
                }
            }
        }
    });
    
    // ایجاد Legend سفارشی
    createCustomLegend();
}

// ایجاد Legend سفارشی برای نمودار دایره‌ای
function createCustomLegend() {
    const legendContainer = document.getElementById('productLegend');
    if (!legendContainer || !productDistributionChart) return;
    
    const data = productDistributionChart.data;
    let legendHTML = '';
    
    data.labels.forEach((label, index) => {
        const color = data.datasets[0].backgroundColor[index];
        const value = data.datasets[0].data[index];
        legendHTML += `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${color}"></div>
                <span>${label} (${value}%)</span>
            </div>
        `;
    });
    
    legendContainer.innerHTML = legendHTML;
}

// نمودار مقایسه‌ای
function initComparisonChart() {
    const ctx = document.getElementById('comparisonChart');
    if (!ctx) return;
    
    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
            datasets: [
                {
                    label: 'سال جاری',
                    data: [120, 150, 180, 220, 190, 240],
                    backgroundColor: chartColors.primary,
                    borderRadius: 6
                },
                {
                    label: 'سال قبل',
                    data: [100, 130, 150, 180, 170, 200],
                    backgroundColor: chartColors.info + '60',
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// نمودار روند
function initTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');
    
    trendChart = new Chart(context, {
        type: 'line',
        data: {
            labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
            datasets: [
                {
                    label: 'بازدید',
                    data: [1200, 1900, 1500, 2100, 2400, 2200, 1800],
                    borderColor: chartColors.warning,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'نرخ تبدیل (%)',
                    data: [3.2, 3.8, 3.5, 4.1, 4.5, 4.2, 3.9],
                    borderColor: chartColors.success,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'right'
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// تغییر نوع نمودار
function changeChartType(chartName, type) {
    if (chartName === 'revenue' && revenueChart) {
        // حذف کلاس active از همه دکمه‌ها
        document.querySelectorAll('.chart-actions .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // اضافه کردن کلاس active به دکمه کلیک شده
        event.target.classList.add('active');
        
        // تغییر نوع نمودار
        if (type === 'area') {
            revenueChart.config.type = 'line';
            revenueChart.data.datasets.forEach(dataset => {
                dataset.fill = true;
            });
        } else {
            revenueChart.config.type = type;
            revenueChart.data.datasets.forEach(dataset => {
                dataset.fill = type === 'line' ? false : true;
            });
        }
        
        revenueChart.update();
    }
}

// به‌روزرسانی نمودار محصولات
function updateProductChart(period) {
    if (!productDistributionChart) return;
    
    // داده‌های نمونه برای دوره‌های مختلف
    const periodData = {
        today: [15, 22, 18, 25, 12, 8],
        week: [25, 20, 15, 18, 14, 8],
        month: [30, 25, 15, 12, 10, 8]
    };
    
    productDistributionChart.data.datasets[0].data = periodData[period];
    productDistributionChart.update();
    createCustomLegend();
}
