<script>
  import Pie from "svelte-chartjs/src/Pie.svelte";
  export let str;
  export let agi;
  export let int;
  let data = {
    labels: ["Strength", "Agility", "Intelligence"],
    datasets: [
      {
        data: [str, agi, int],
        backgroundColor: ["#853939", "#53723d", "#3f83a7"],
        hoverBackgroundColor: ["#b46464", "#6c8d56", "#67accb"],
        borderColor: ["rgba(0,0,0,0.6)"],
      },
    ],
  };

  let options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        // callbacks: {
        //   label: function (context) {
        //     return context.parsed;
        //   },
        // },
      },
    },
    maintainAspectRatio: true,
  };
</script>

<Pie {data} {options} />
