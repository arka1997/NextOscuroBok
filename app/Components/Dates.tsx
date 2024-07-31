'use client'

export const getDates = () => {
  
  let currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth(); 
  let date = currentDate.getDate();
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

  let currentDate = new Date();
  const time = currentDate.toLocaleTimeString()
  
  return (time);
}