$(document).ready(function() {
    $("#fromDate, #toDate").persianDatepicker({
        format: 'YYYY/MM/DD',
        autoClose: true,
        responsive: true,
        position: 'auto',
        calendarType: 'persian',
        calendar: {
            persian: {
                locale: 'fa'
            }
        }
    });
    $('.search-input').on('keypress', function(e) {
        if(e.which === 13) {
            performSearch();
        }
    });
    $('.search-btn').on('click', function() {
        performSearch();
    });
    $('.filter-btn').on('click', function() {
        applyFilters();
    });
    $('.reset-btn').on('click', function() {
        resetFilters();
    });
    $(document).on('click', '.remove-filter', function() {
        const filterType = $(this).data('filter');
        removeFilter(filterType);
        $(this).parent().fadeOut(300, function() {
            $(this).remove();
        });
    });
    $('.clear-all').on('click', function() {
        resetFilters();
        $('.active-filters').fadeOut();
    });
    function performSearch() {
        const searchValue = $('.search-input').val();
        if(searchValue) {
            console.log('جستجو برای:', searchValue);
        }
    }
    function applyFilters() {
        const filters = {
            search: $('.search-input').val(),
            status: $('.status-select').val(),
            fromDate: $('#fromDate').val(),
            toDate: $('#toDate').val()
        };
        if(filters.search || filters.status || filters.fromDate || filters.toDate) {
            $('.active-filters').fadeIn();
        }
        console.log('فیلترهای اعمال شده:', filters);
    }
    function resetFilters() {
        $('.search-input').val('');
        $('.status-select').val('');
        $('#fromDate').val('');
        $('#toDate').val('');
        $('.active-filters').fadeOut();
    }
    function removeFilter(filterType) {
        switch(filterType) {
            case 'search':
                $('.search-input').val('');
                break;
            case 'status':
                $('.status-select').val('');
                break;
            case 'fromDate':
                $('#fromDate').val('');
                break;
            case 'toDate':
                $('#toDate').val('');
                break;
        }
        applyFilters();
    }
});