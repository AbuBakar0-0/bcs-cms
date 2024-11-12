export const formatSSN = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 5) {
        return `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 5) {
        return `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 9)}`;
    }
    return value;
};

export const formatDOB = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 2 && value.length <= 4) {
        return `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length > 4) {
        return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    }
    return value;
};

export const formatZip = (value) => {
    value = value.replace(/\D/g, '');
    return value.length > 5 ? `${value.slice(0, 5)}-${value.slice(5, 9)}` : value;
};

export const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length > 3 && value.length <= 6) {
        return `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 6) {
        return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    return value;
};
