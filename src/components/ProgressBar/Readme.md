### Default theme
```jsx
<ProgressBar value={50} theme="primary" /> <br /> 
<ProgressBar value={50} theme="secondary" /> <br />
<ProgressBar value={50} theme="danger" /> <br />
<ProgressBar value={50} theme="success" /> <br />
<ProgressBar value={50} theme="info" /> <br />
<ProgressBar value={50} theme="warning" /> <br />
```

### ProgressBar Sizes
```jsx
<ProgressBar value={75} size="sm" theme="primary" /> <br />
<ProgressBar value={75} size="md" theme="primary" /> <br />
<ProgressBar value={75} size="lg" theme="primary" /> <br />
```

### ProgressBar with Label
```jsx
<ProgressBar value={60} theme="primary" label="Loading data..." /> <br />
```

### ProgressBar with Percentage Display
```jsx
<ProgressBar value={35} theme="primary" showPercentage={true} /> <br />
```

### ProgressBar with Different Percentage Positions
```jsx
<ProgressBar value={60} theme="primary" showPercentage={true} percentagePosition="top" /> <br />
<ProgressBar value={60} theme="primary" showPercentage={true} percentagePosition="bottom" /> <br />
<ProgressBar value={60} theme="primary" showPercentage={true} percentagePosition="inside" /> <br />
```

### ProgressBar with Custom Percentage Text
```jsx
<ProgressBar 
  value={45} 
  theme="info" 
  showPercentage={true} 
  formatPercentage={(value) => `${value}% completed`}
/> <br />
```

### ProgressBar with Label and Percentage Display
```jsx
<ProgressBar 
  value={80} 
  theme="success" 
  label="Upload progress" 
  showPercentage={true} 
/> <br />
```

### ProgressBar with Custom Max Value
```jsx
<ProgressBar 
  value={150} 
  max={200} 
  theme="info" 
  label="Custom max (150/200)" 
  showPercentage={true} 
/> <br />
```

### ProgressBar with Bottom Label
```jsx
<ProgressBar 
  value={35} 
  theme="danger" 
  showBottomLabel={true} 
  formatBottomLabel={(value) => `${value}% compliant`}
/> <br />
<ProgressBar 
  value={62} 
  theme="warning" 
  showBottomLabel={true} 
  formatBottomLabel={(value) => `${value}% compliant`}
/> <br />
<ProgressBar 
  value={92} 
  theme="success" 
  showBottomLabel={true} 
  formatBottomLabel={(value) => `${value}% compliant`}
/> <br />
```

### ProgressBar with Different Bottom Label Templates
```jsx
<ProgressBar 
  value={35} 
  theme="primary" 
  showBottomLabel={true} 
  formatBottomLabel={(value) => `${value}% completed`}
/> <br />
<ProgressBar 
  value={50} 
  theme="info" 
  showBottomLabel={true} 
  formatBottomLabel={(value) => `Step ${value} of 100`}
/> <br />
<ProgressBar 
  value={75} 
  theme="success" 
  showBottomLabel={true} 
  formatBottomLabel={(value) => `Almost there! (${value}%)`}
/> <br />
```

### ProgressBar with Combined Features
```jsx
<ProgressBar 
  value={78} 
  theme="primary" 
  label="Security compliance" 
  showPercentage={true}
  percentagePosition="inside"
  showBottomLabel={true}
  formatBottomLabel={(value) => `${value}% compliant`}
/> <br />
```

### Interactive ProgressBar Example
```jsx
import { useState, useEffect } from 'react';

const ProgressExample = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 500);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <ProgressBar 
      value={progress} 
      theme="primary" 
      label="Loading..." 
      showPercentage={true} 
    />
  );
};

<ProgressExample />
```