function checkPatternInt(x) {
  let elem = document.getElementById(x);
  const re = /^\d+$/;
  if(elem.value == 0 || elem.value == null) return false;
  else return re.test(elem.value);
}
function checkPatternFloat(x) {
  let elem = document.getElementById(x);
  const re = /^\d+(\.\d{2})?$/;
  if(elem.value == 0 || elem.value == null) return false;
  else return re.test(elem.value);
}

function calculateMortgage(principal, annualRate, years, mortgageType) {
  let monthlyRate = annualRate / 100 / 12;
  let numberOfPayments = years * 12;

  let monthlyPayment;
  let totalRepayment;

  if (mortgageType === "repay") {
      
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      totalRepayment = monthlyPayment * numberOfPayments;
  } else if (mortgageType === "interest") {
      
      monthlyPayment = principal * monthlyRate;
      totalRepayment = (monthlyPayment * numberOfPayments) + principal;
  } else {
      throw new Error("Invalid mortgage type. Please don't touch it.");
  }
  monthlyPayment = Number(monthlyPayment).toFixed(2);
  totalRepayment = Number(totalRepayment).toFixed(2);
  return {
      monthlyPayment: monthlyPayment,
      totalRepayment: totalRepayment
  };
}
function formatCurrency(value) {
  if (isNaN(value)) return 'Invalid number';
  let formattedValue = Number(value).toFixed(2);
  let parts = formattedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

document.querySelector('input[class="reset"]').addEventListener('click', () => {
  document.querySelectorAll('.type-select').forEach((div) => {
    div.classList.remove('selected');
  });
});

document.querySelectorAll('input[name="type"]').forEach((radio) => {
  radio.addEventListener('change', function() {
    document.querySelectorAll('.type-select').forEach((div) => {
      div.classList.remove('selected');
    });
    this.parentNode.classList.add('selected');
  });
});

document.querySelectorAll('div[class="type-select"]').forEach((div) => {
  div.addEventListener('click', () => {
    const radio = div.querySelector('input[name="type"]');
    radio.checked = true;
    document.querySelectorAll('.type-select').forEach((divElement) => {
      divElement.classList.remove('selected');
    });
    div.classList.add('selected');
  });
});
document.getElementById('submitBTN').addEventListener('click', (event) => {
  let valid = true;
  event.preventDefault();
  if (!document.querySelector('input[name="type"]:checked')) {
    valid = false;
    
    const elem = document.getElementById('type-select').parentNode;
    elem.querySelector("#error").classList.remove('hidden');
    setTimeout(() => {
      elem.querySelector("#error").classList.add('hidden');
    }, 8000);
  } 



  if (!checkPatternFloat('Mortgage-Amount')) {
    valid = false;
    document.getElementById('BOX-Mortgage-Amount').style.borderColor = 'hsl(4, 69%, 50%)';
    document.getElementById('BOX-Mortgage-Amount').querySelector('.mark').style.backgroundColor = 'hsl(4, 69%, 50%)';
    document.getElementById('BOX-Mortgage-Amount').querySelector('.mark').style.color = 'hsl(0, 0%, 100%)';
    const elem = document.getElementById('BOX-Mortgage-Amount').parentNode;
    elem.querySelector("#error").classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('BOX-Mortgage-Amount').style.borderColor = '';
      document.getElementById('BOX-Mortgage-Amount').querySelector('.mark').style.backgroundColor = '';
      document.getElementById('BOX-Mortgage-Amount').querySelector('.mark').style.color = '';
      elem.querySelector("#error").classList.add('hidden');
    }, 8000);
    document.getElementById('Mortgage-Amount').setCustomValidity("if Mortgage Amount is float, you must use '.' instead of ','");
    document.getElementById('Mortgage-Amount').reportValidity();
  } 



  if (!checkPatternInt('term')) {
    valid = false;
    document.getElementById('BOX-term').style.borderColor = 'hsl(4, 69%, 50%)';
    document.getElementById('BOX-term').querySelector('.mark-rev').style.backgroundColor = 'hsl(4, 69%, 50%)';
    document.getElementById('BOX-term').querySelector('.mark-rev').style.color = 'hsl(0, 0%, 100%)';
    const elem = document.getElementById('BOX-term').parentNode;
    elem.querySelector("#error").classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('BOX-term').style.borderColor = '';
      document.getElementById('BOX-term').querySelector('.mark-rev').style.backgroundColor = '';
      document.getElementById('BOX-term').querySelector('.mark-rev').style.color = '';
      document.getElementById('term').setCustomValidity("");
      elem.querySelector("#error").classList.add('hidden');
    }, 8000);
    document.getElementById('term').setCustomValidity('Term must be an integer');
    document.getElementById('term').reportValidity();
  } 




  if (!checkPatternFloat('intere')) {
    valid = false;
    document.getElementById('BOX-intere').style.borderColor = 'hsl(4, 69%, 50%)';
    document.getElementById('BOX-intere').querySelector(".mark-rev").style.backgroundColor = 'hsl(4, 69%, 50%)';
    document.getElementById('BOX-intere').querySelector('.mark-rev').style.color = 'hsl(0, 0%, 100%)';
    const elem = document.getElementById('BOX-intere').parentNode;
    elem.querySelector("#error").classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('BOX-intere').style.borderColor = '';
      document.getElementById('BOX-intere').querySelector(".mark-rev").style.backgroundColor = '';
      document.getElementById('BOX-intere').querySelector('.mark-rev').style.color = '';
      elem.querySelector("#error").classList.add('hidden');
    }, 8000);
    document.getElementById('intere').setCustomValidity("if Interest Rate is float, you must use '.' instead of ','")
    document.getElementById('intere').reportValidity();
    
  } 
  
  if (valid==true) {
    let type = document.querySelector('input[name="type"]:checked').value;
    let amount = document.querySelector('input[id="Mortgage-Amount"]').value;
    let term = document.querySelector('input[id="term"]').value;
    let interest = document.querySelector('input[id="intere"]').value;
    let repaymentResult = calculateMortgage(amount, interest, term, type);

    const resultElem = document.getElementById('rightWing');

    resultElem.innerHTML = `
    <div class="flex-c gap10">
      <span class="white result-header">Your results</span>
      <p class="gray result-desc">Your results are shown below based on the information you provided. 
      To adjust the results, edit the form and click “calculate repayments” again.</p>
    </div>
    <div class="result-box">
      <div class="flex-c underline padding-b10">
        <span class="gray monthly">Your monthly repayments</span>
        <span class="result-lime monthlyMoney">$ ${formatCurrency(repaymentResult.monthlyPayment)}</span>
      </div>
      <div class="flex-c">
        <span class="gray">Total you'll repay over the term</span> 
        <span class="result-white">$ ${formatCurrency(repaymentResult.totalRepayment)}</span>
      </div>
    </div>
    `;
  }
});
