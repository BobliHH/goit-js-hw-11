import './css/styles.css';
import notiflix from 'notiflix';
import lodash from 'lodash';
import debounce from 'lodash/debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault(e);
  const SearchForContry = e.target.value.trim();

  if (!SearchForContry) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(SearchForContry)
          .then(result => {
              if (result.length > 10) {
                  notiflix.Notify.info(
                    'Too many matches found. Please, enter a more specific name.'
                  );
                  return;
              }
              renderedCountries(result);
          })
          .catch(error => {
              countryList.innerHTML = '';
              countryInfo.innerHTML = '';
              notiflix.Notify.failure(
                'Oops, there is no country with that name'
              );
          })
};

function renderedCountries(result) {
    const inputLength = result.length;

    if (inputLength === 1) {
        countryList.innerHTML = "";
        //return card with winformation
    }

    if (inputLength > 1) {
        countryInfo.innerHTML = "";
        //return card with winformation
    }
};