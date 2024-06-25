```js
import Icon from './index';
const fontAwesomeIconNames = [
    "copy",
    "plus",
    "trash",
    "circle-xmark",
    "pencil",
    "arrow-rotate-left",
    "eye",
    "eye-slash",
    "user",
    "arrows-rotate",
    "circle-ellipsis",
    "circle-ellipsis-vertical",
    "magnifying-glass",
    "bars-filter",
    "hexagon-check",
    "hexagon-exclamation",
    "triangle-exclamation",
    "circle-info",
    "chevron-down",
    "chevron-up",
    "chevron-right",
    "arrow-up-right-from-square",
    "circle-question",
    "grip-dots-vertical",
    "expand",
    "compress",
    "lock",
    "unlock",
    "bell",
    "gear",
    "arrow-down-to-line",
    "chevron-right",
    "chevron-left",
    "chevrons-left",
    "chevrons-right",
    "clock",
    "calendar",
    "chart-simple",
    "chart-line",
    "tag",
    "hourglass",
    "star",
    "circle-check",
    "circle-minus",
    "arrow-rotate-right",
    "arrows-repeat",
    "file-import",
    "check",
    "xmark",
    "house",
    "gears",
    "file-dashed-line",
    "chart-network",
    "key",
    "gauge",
    "certificate",
    "webhook",
    "users",
    "address-card",
    "book",
    "code-branch",
    "globe",
    "circle-exclamation",
    "truck-clock",
    "bullseye",
    "circle-nodes",
    "helmet-battle",
    "wrench",
    "books",
    "message-exclamation",
    "brackets-curly",
    "page",
    "bars",
    "file-code",
    "temperature-list",
    "monitor-waveform",
    "server",
    "rocket",
    "receipt",
    "hand-holding-box",
    "gear-code",
    "paintbrush-fine",
    "square-rss"
];

<>
<h1>Font Awesome</h1>
<table style={{width: '300px', marginBottom: '50px'}}>
  <thead>
    <tr>
      <th style={{fontWeight: 'bold', padding: '10px', textAlign: 'center', width: '100px'}}>Name</th>
      <th style={{fontWeight: 'bold', padding: '10px', textAlign: 'center', width: '100px'}}>Light</th>
      <th style={{fontWeight: 'bold', padding: '10px', textAlign: 'center', width: '100px'}}>Solid</th>
    </tr>
  </thead>
  <tbody>
  {
    fontAwesomeIconNames.map((name, index) => {
      return (
        <tr key={index} style={{ borderBottom: '1px solid gray'}}>
          <td style={{ padding: '5px 10px', textAlign: 'center'}}>{name}</td>
          <td style={{ padding: '5px 10px', textAlign: 'center'}}><Icon type={name} /></td>
          <td style={{ padding: '5px 10px', textAlign: 'center'}}><Icon type={name} weight="solid" /></td>
        </tr>
      )
    })
  }
  </tbody>
</table>
<h1>Tykon font</h1>
<div>
  <Icon family="tykon" type="doublearrowdown" />
  <Icon family="tykon" type="arrowsort" />
  <Icon family="tykon" type="arrowdown" />
  <Icon family="tykon" type="arrowleft" />
  <Icon family="tykon" type="arrowright" />
  <Icon family="tykon" type="arrowup" />
  <Icon family="tykon" type="doublearrowdown" />
  <Icon family="tykon" type="filter" />
  <Icon family="tykon" type="graph1" />
  <Icon family="tykon" type="graph2" />
  <Icon family="tykon" type="label" />
  <Icon family="tykon" type="reload" />
  <Icon family="tykon" type="select" />
  <Icon family="tykon" type="target" />
  <Icon family="tykon" type="undo" />
  <Icon family="tykon" type="deployment" />
  <Icon family="tykon" type="team" />
  <Icon family="tykon" type="overview" />
  <Icon family="tykon" type="loadout" />
  <Icon family="tykon" type="entitlement" />
  <Icon family="tykon" type="users" />
  <Icon family="tykon" type="check" />
  <Icon family="tykon" type="copy" />
  <Icon family="tykon" type="delete" />
  <Icon family="tykon" type="download" />
  <Icon family="tykon" type="draft" />
  <Icon family="tykon" type="edit" />
  <Icon family="tykon" type="filter" />
  <Icon family="tykon" type="help" />
  <Icon family="tykon" type="label" />
  <Icon family="tykon" type="link" />
  <Icon family="tykon" type="lock1" />
  <Icon family="tykon" type="lock2" />
  <Icon family="tykon" type="notifications" />
  <Icon family="tykon" type="plus" />
  <Icon family="tykon" type="profile" />
  <Icon family="tykon" type="reload" />
  <Icon family="tykon" type="search" />
  <Icon family="tykon" type="select" />
  <Icon family="tykon" type="settings" />
  <Icon family="tykon" type="target" />
  <Icon family="tykon" type="undo" />
  <Icon family="tykon" type="warning" />
  <Icon family="tykon" type="x" />
  <Icon family="tykon" type="waiting" />
  <Icon family="tykon" type="fullscreen" />
  <Icon family="tykon" type="fullscreen-exit" />
  <Icon family="tykon" type="time" />
</div>
</>
```
