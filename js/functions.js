const checkLength = (string = '', maxLength = 1) => (string.length <= maxLength);

checkLength('Проверяемая строка', 20);
checkLength('Проверяемая строка', 18);
checkLength('Проверяемая строка', 10);

function checkPalindrom(string = '') {
  const normalSrting = string.replaceAll(' ', '').toUpperCase();
  let reversedString = '';

  for (let i = normalSrting.length - 1; i >= 0; i--) {
    reversedString += normalSrting[i];
  }
  return normalSrting === reversedString;
}
checkPalindrom('Топот');
checkPalindrom('ДовОд');
checkPalindrom('кекс');
