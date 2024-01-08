const formatDate = (date) => {
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    return [year, month, day].join('-');
}

module.exports = { formatDate };