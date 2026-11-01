
const data = {
  studio: { cuFt: 400, truck: "10 ft Truck", small: 12, med: 10, large: 5, wardrobe: 2, tape: 2, blankets: 6 },
  "1bed": { cuFt: 750, truck: "15 ft Truck", small: 18, med: 16, large: 8, wardrobe: 3, tape: 4, blankets: 12 },
  "2bed": { cuFt: 1100, truck: "15 ft or 20 ft Truck", small: 28, med: 24, large: 14, wardrobe: 5, tape: 6, blankets: 18 },
  "3bed": { cuFt: 1600, truck: "20 ft or 26 ft Truck", small: 40, med: 35, large: 20, wardrobe: 7, tape: 8, blankets: 24 },
  "4bed": { cuFt: 2200, truck: "26 ft Truck (Max)", small: 55, med: 50, large: 30, wardrobe: 10, tape: 12, blankets: 36 }
};

function calc() {
  const size = document.getElementById('homeSize').value;
  const mult = parseFloat(document.getElementById('density').value) || 1.0;
  const dist = document.getElementById('distance').value;

  const base = data[size];
  const cuFt = Math.round(base.cuFt * mult);
  const sm = Math.round(base.small * mult);
  const md = Math.round(base.med * mult);
  const lg = Math.round(base.large * mult);
  const wd = Math.round(base.wardrobe * mult);
  const total = sm + md + lg + wd;
  const tape = Math.ceil(base.tape * mult);
  const blankets = Math.round(base.blankets * mult);

  let truck = base.truck;
  if (dist === "crossCountry" && size === "2bed" && mult > 1.0) {
    truck = "20 ft Truck (Safe One-Way)";
  }
  if (dist === "crossCountry" && size === "3bed") {
    truck = "26 ft Truck (Avoid 2 Trips)";
  }

  document.getElementById('truckSize').innerText = truck;
  document.getElementById('cargoCuFt').innerText = cuFt.toLocaleString() + ' cu ft';
  document.getElementById('totalBoxes').innerText = total + ' boxes';
  document.getElementById('tapeRolls').innerText = tape + ' rolls';

  document.getElementById('boxBreakdown').innerHTML = 
    `• <strong>${sm} Small Boxes</strong> (Heavy items: books, canned food, tools)<br>` +
    `• <strong>${md} Medium Boxes</strong> (Kitchenware, small appliances, toys)<br>` +
    `• <strong>${lg} Large Boxes</strong> (Linens, pillows, lamps, board games)<br>` +
    `• <strong>${wd} Wardrobe Boxes</strong> (Hanging closet clothes: ~2 ft rod each)<br>` +
    `• <strong>${blankets} Moving Blankets</strong> (Pad wood, TV screens, sofas)`;
}

['homeSize', 'density', 'distance'].forEach(id => {
  document.getElementById(id).addEventListener('change', calc);
});

calc();
