import moment from 'moment';

export const getDateFromValue = (value) =>  {
    return moment(value.toString(), 'DD.MM.YYYY'); 
};
    