/**
* Grid theme heavily based on work by Torstein Hønsi
*/

(function ( $ ) {
  $.fn.finch = function( options ) {

    // Default options
    var settings = $.extend({
      "data": "data.csv",
    }, options );

    // Chart options
    var chartOptions = {
      colors: ['#50B432', '#ED561B', '#058DC7'],

      chart: {
        type: 'column',
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: [
          [0, 'rgb(255, 255, 255)'],
          [1, 'rgb(240, 240, 255)']
          ]
        },
        borderWidth: 2,
        plotBackgroundColor: 'rgba(255, 255, 255, .9)',
        plotShadow: true,
        plotBorderWidth: 1
      },

      title: {
        text: 'API Automation',
        style: {
          color: '#000',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
        },
      },

      subtitle: {
        text: 'Nightly Builds',
        style: {
          color: '#666',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
        },
      },

      xAxis: {
        gridLineWidth: 1,
        lineColor: '#000',
        tickColor: '#000',
        style: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif',
        },
        categories: []
      },

      yAxis: {
        min: 0,
        minorTickInterval: 'auto',
        lineColor: '#000',
        lineWidth: 1,
        tickWidth: 1,
        tickColor: '#000',

        title: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Trebuchet MS, Verdana, sans-serif',
          text: 'Tests'
        },

        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        }
      },

      legend: {
        align: 'right',
        x: -100,
        verticalAlign: 'top',
        y: 20,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },

      tooltip: {
        formatter: function() {
          return '<b>'+ this.x +'</b><br/>'+
          this.series.name +': '+ this.y +'<br/>'+
          'Total: '+ this.point.stackTotal;
        }
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
          }
        }
      },

      series: [{
        name: '',
        data: []
      }, {
        name: '',
        data: []
      }, {
        name: '',
        data: []
      }]
    }

    var elements = this;

    $.get(settings.data, function(data) {
      // Split the lines
      var lines = data.split('\n');

      // Iterate over the lines and add categories or series
      $.each(lines, function(lineNo, line) {
        if (line.length > 0) {
          var items = line.split(',');

          // header line containes categories
          if (lineNo == 0) {
            chartOptions.title.text = items[0];
            chartOptions.series[0].name = items[1];
            chartOptions.series[1].name = items[2];
            chartOptions.series[2].name = items[3];
          }

          // the rest of the lines contain data with their name in the first position
          else {
            chartOptions.xAxis.categories.push(items[0]);
            chartOptions.series[0].data.push(parseInt(items[1]));
            chartOptions.series[1].data.push(parseInt(items[2]));
            chartOptions.series[2].data.push(parseInt(items[3]));
          }
        }
      });

      // Create the chart
      elements.highcharts(chartOptions);
    });

    return this;
  }
})( jQuery );
