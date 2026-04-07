const labels = buildingsData.map(b => b.name);
const data = buildingsData.map(b => b.searchCount || 0);

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Search Count',
      data: data
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // 🔥 IMPORTANT
  }
});