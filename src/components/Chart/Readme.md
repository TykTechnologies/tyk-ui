```js
<Chart
  hasData={ true }
  dataLoaded={ true }
  areaStyleColors={[
    '#05C7B6', '#109EAE'
  ]}
  option={{
    color: ['#05C7B6'],
  	xAxis: {
  		data: ["26 Feb 2019", "27 Feb 2019", "28 Feb 2019", "01 Mar 2019", "02 Mar 2019", "03 Mar 2019", "04 Mar 2019", "05 Mar 2019", "06 Mar 2019"]
  	}
  }}
  series={[
    {
  		data: [335, 238, 287, 163, 166, 0, 0, 0, 0],
  		name: "Success"
  	}
  ]}
/>
<Chart
  hasData={ true }
  dataLoaded={ true }
  type="pie"
  option={{
    legend: {
      data: [
        'Forbidden (403)',
        'Application error (500)'
      ]
    },
    color: [
      '#c9234d',
      '#e0839a'
    ]
  }}
  series={[
    {
      data: [
        {
          value: 91,
          name: 'Forbidden (403)'
        },
        {
          value: 93,
          name: 'Application error (500)'
        }
      ]
    }
  ]}
/>
```
