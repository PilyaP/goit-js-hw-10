import './css/styles.css';
import api from './js/api';
import createRefs from './js/createRefs';
import { renderCountryInfo, renderCountryList } from './js/renderCountry';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = createRefs();
refs.formInput.placeholder = refs.placeholder;

refs.formInput.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
const countryInput = event.target.value.trim();
if (!countryInput) {
clearData();
return;
}
api(countryInput)
.then(data => {
if (data.length > 10) {
clearData();
Notify.info('Too many matches found. Please enter a more specific name.');
} else if (data.length > 1) {
clearData();
renderCountryList(data);
} else {
clearInput();
clearData();
renderCountryInfo(data);
}
})
.catch(() => {
Notify.failure('Oops, there is no country with that name');
clearInput();
clearData();
});
}

function clearData() {
refs.countryInfo.innerHTML = '';
refs.countryList.innerHTML = '';
}

function clearInput() {
refs.formInput.value = '';
}