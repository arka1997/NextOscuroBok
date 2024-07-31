'use client'

export const getDates = () => {
  
  var currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth(); 
  var date = currentDate.getDate();
  const creationDate = new Date(year, month, date);

  const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
      year:  'numeric',
      month: 'long',
      day:   'numeric',
  });

  const dateFormat = longEnUSFormatter.format(creationDate);
  
  return dateFormat;
}

export const getTimes = () => {

  var currentDate = new Date();
  const time = currentDate.toLocaleTimeString()
  
  return (time);
}