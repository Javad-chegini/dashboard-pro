$(document).ready(function() {
  $(".persian-datepicker").persianDatepicker({
    format: 'YYYY/MM/DD',
    autoClose: true,
    responsive: true,
    calendarType: 'persian',
    calendar: {
      persian: {
        locale: 'fa',
        showHint: true,
        leapYearMode: "algorithmic"
      }
    },
    navigator: {
      enabled: true,
      scroll: {
        enabled: true
      },
      text: {
        btnNextText: "<",
        btnPrevText: ">"
      }
    },
    toolbox: {
      enabled: true,
      todayButton: {
        enabled: true,
        text: {
          fa: "امروز"
        }
      },
      submitButton: {
        enabled: true,
        text: {
          fa: "تایید"
        }
      }
    }
  });
});
function setQuickDate(period) {
  const today = new persianDate();
  let fromDate, toDate;
  switch (period) {
    case 'today':
      fromDate = toDate = today.format('YYYY/MM/DD');
      break;
    case 'week':
      fromDate = today.startOf('week').format('YYYY/MM/DD');
      toDate = today.endOf('week').format('YYYY/MM/DD');
      break;
    case 'month':
      fromDate = today.startOf('month').format('YYYY/MM/DD');
      toDate = today.endOf('month').format('YYYY/MM/DD');
      break;
    case 'year':
      fromDate = today.startOf('year').format('YYYY/MM/DD');
      toDate = today.endOf('year').format('YYYY/MM/DD');
      break;
  }
  $('#fromDate').val(fromDate);
  $('#toDate').val(toDate);
  $('.quick-dates .btn').removeClass('btn-primary').addClass('btn-outline-secondary');
  event.target.classList.remove('btn-outline-secondary');
  event.target.classList.add('btn-primary');
}
$('#reportType').on('change', function() {
  const reportType = $(this).val();
  const $subType = $('#reportSubType');
  $subType.empty().append('<option value="">زیرمجموعه (اختیاری)</option>');
  const subOptions = {
    sales: ['روزانه', 'هفتگی', 'ماهانه', 'فصلی', 'سالانه'],
    users: ['کاربران جدید', 'کاربران فعال', 'کاربران غیرفعال'],
    products: ['پرفروش‌ترین', 'کم‌فروش‌ترین', 'موجودی', 'قیمت‌گذاری'],
    orders: ['تکمیل شده', 'در حال پردازش', 'لغو شده', 'مرجوع شده'],
    financial: ['درآمد', 'هزینه', 'سود خالص', 'مالیات']
  };
  if (subOptions[reportType]) {
    subOptions[reportType].forEach(option => {
      $subType.append(`<option value="${option}">${option}</option>`);
    });
    $subType.prop('disabled', false);
  } else {
    $subType.prop('disabled', true);
  }
});
function toggleAdvancedFilters() {
  $('#advancedFilters').slideToggle();
  const btn = event.target.closest('button');
  btn.classList.toggle('btn-primary');
  btn.classList.toggle('btn-outline-secondary');
}
function applyFilters() {
  const filters = {
    fromDate: $('#fromDate').val(),
    toDate: $('#toDate').val(),
    reportType: $('#reportType').val(),
    reportSubType: $('#reportSubType').val(),
    status: $('#statusFilter').val(),
    compareMode: $('#compareMode').is(':checked'),
    priceFrom: $('#priceFrom').val(),
    priceTo: $('#priceTo').val(),
    categories: $('#categoryFilter').val(),
    location: $('#locationFilter').val(),
    tags: $('#tagSearch').val()
  };
  showActiveFilters(filters);
  updateReports(filters);
  showNotification('فیلترها با موفقیت اعمال شد', 'success');
}
function showActiveFilters(filters) {
  const activeFiltersDiv = $('#activeFilters');
  const container = activeFiltersDiv.find('.d-flex');
  container.find('.filter-tag').remove();
  let hasActiveFilters = false;
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== 'all' && value !== '') {
      hasActiveFilters = true;
      let label = getFilterLabel(key, value);
      container.append(`
                <span class="filter-tag">
                    ${label}
                    <i class="fas fa-times remove-filter"
                       onclick="removeFilter('${key}')"></i>
                </span>
            `);
    }
  });
  activeFiltersDiv.toggle(hasActiveFilters);
}
function removeFilter(filterKey) {
  $(`#${filterKey}`).val('').trigger('change');
  if (filterKey === 'compareMode') {
    $('#compareMode').prop('checked', false);
  }
  applyFilters();
}
function resetFilters() {
  $('.filter-card input').val('');
  $('.filter-card select').val('all').trigger('change');
  $('#compareMode').prop('checked', false);
  $('.quick-dates .btn').removeClass('btn-primary').addClass('btn-outline-secondary');
  $('#activeFilters').hide();
  $('#advancedFilters').slideUp();
  showNotification('فیلترها بازنشانی شدند', 'info');
}
function getFilterLabel(key, value) {
  const labels = {
    fromDate: 'از تاریخ',
    toDate: 'تا تاریخ',
    reportType: 'نوع گزارش',
    reportSubType: 'زیرمجموعه',
    status: 'وضعیت',
    compareMode: 'حالت مقایسه',
    priceFrom: 'قیمت از',
    priceTo: 'قیمت تا',
    location: 'شهر',
    tags: 'برچسب'
  };
  return `${labels[key] || key}: ${value}`;
}
function showNotification(message, type) {
  const toast = `
        <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'info'} border-0"
             role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
  $('.toast-container').append(toast);
  const toastEl = $('.toast').last()[0];
  const bsToast = new bootstrap.Toast(toastEl, {
    delay: 3000
  });
  bsToast.show();
}
$(document).ready(function() {
  if ($.fn.select2) {
    $('#categoryFilter').select2({
      placeholder: 'انتخاب دسته‌بندی',
      dir: 'rtl',
      language: 'fa'
    });
  }
});