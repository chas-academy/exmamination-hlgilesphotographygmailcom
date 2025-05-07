
const incomes = [];
const expenses = [];

const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");

function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Vänligen fyll i en giltig beskrivning och ett positivt belopp.");
    return;
  }

  const transaction = { description, amount, type };

  if (type === "income") {
    incomes.push(transaction);
    renderTransaction(transaction, incomeList, "income");
  } else {
    expenses.push(transaction);
    renderTransaction(transaction, expenseList, "expense");
  }

  renderTransaction(transaction, transactionList, type);
  updateBalance();

  descInput.value = "";
  amountInput.value = "";
}

function renderTransaction(transaction, listElement, cssClass) {
  const li = document.createElement("li");
  li.textContent = `${transaction.description}: ${transaction.amount} kr`;
  li.classList.add(cssClass);
  listElement.appendChild(li);
}

function updateBalance() {
  const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = incomeTotal - expenseTotal;

  balanceEl.textContent = balance.toFixed(2);
}

incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));
