import Vue from 'vue';
export default Vue.directive('outer-click-hide', {
    inserted: function(el) {
        document.addEventListener('click', e => {
            let except_selector = el.getAttribute('except');
            let except = document.querySelectorAll(except_selector);

            for(let it in except) {
                if(it === e.target)
                    return;
                if(!el.contains(e.target))
                el.style.display = none;
            }
        })
    }
})