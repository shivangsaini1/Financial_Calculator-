let yearCounter = 1;

    function addYearInput() {
      yearCounter++;
      const newInput = document.createElement("div");
      newInput.innerHTML = `<label for="year${yearCounter}">Year ${yearCounter}:</label><input type="number" id="year${yearCounter}" placeholder="Cash flow for year ${yearCounter}">`;
      document.getElementById('cashFlowsInput').appendChild(newInput);
    }

    function calculateAll() {
      const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
      const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;

      let cashFlows = [];
      for (let i = 1; i <= yearCounter; i++) {
        cashFlows.push(parseFloat(document.getElementById(`year${i}`).value));
      }

      const npv = calculateNetPresentValue(initialInvestment, discountRate, cashFlows);
      const roi = calculateROI(initialInvestment, cashFlows);
      const payback = calculatePaybackPeriod(initialInvestment, cashFlows);
      const netProfit = calculateNetProfit(cashFlows);

      document.getElementById('npvResult').textContent = npv.toFixed(2);
      document.getElementById('roiResult').textContent = (roi * 100).toFixed(2) + '%';
      document.getElementById('paybackResult').textContent = payback;
      document.getElementById('netProfitResult').textContent = netProfit.toFixed(2);
    }

    function calculateNetPresentValue(initialInvestment, discountRate, cashFlows) {
      let npv = -initialInvestment;
      for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
      }
      return npv;
    }

    function calculateROI(initialInvestment, cashFlows) {
      const netProfit = calculateNetProfit(cashFlows);
      return netProfit / initialInvestment;
    }

    function calculatePaybackPeriod(initialInvestment, cashFlows) {
      let cumulativeCashFlow = 0;
      for (let i = 0; i < cashFlows.length; i++) {
        cumulativeCashFlow += cashFlows[i];
        if (cumulativeCashFlow >= initialInvestment) {
          return i + 1; // Payback period in years
        }
      }
      return "Payback not reached";
    }

    function calculateNetProfit(cashFlows) {
      return cashFlows.reduce((total, current) => total + current, 0);
    }