const incomes = [];
const expenses = [];

const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const balanceEl = document.getElementById("balance");

function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount)) return;

  const transaction = {
    description,
    amount,
    type
  };

  const li = document.createElement("li");
  li.textContent = `${description} - ${amount} kr ${type === "income" ? "(Inkomst)" : "(Utgift)"}`;

  if (type === "income") {
    incomes.push(transaction);
    li.classList.add("income");
    incomeList.appendChild(li);
  } else if (type === "expense") {
    expenses.push(transaction);
    li.classList.add("expense");
    expenseList.appendChild(li);
  }

  updateBalance();
  descInput.value = "";
  amountInput.value = "";
}

function updateBalance() {
  const incomeTotal = incomes.reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + t.amount, 0);
  const balance = incomeTotal - expenseTotal;
  balanceEl.textContent = `${balance}`;
}

incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));