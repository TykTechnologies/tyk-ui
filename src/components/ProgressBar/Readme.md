**ProgressBar Themes**

*Default theme*
```js
<ProgressBar value={50} theme="primary" /> <br/><br/>
<ProgressBar value={50} theme="secondary" /> <br/><br/>
<ProgressBar value={50} theme="danger" /> <br/><br/>
<ProgressBar value={50} theme="success" /> <br/><br/>
<ProgressBar value={50} theme="info" /> <br/><br/>
<ProgressBar value={50} theme="warning" /> <br/><br/>
```

**ProgressBar Sizes**
```js
<ProgressBar value={75} size="sm" theme="primary" /> <br/><br/>
<ProgressBar value={75} size="md" theme="primary" /> <br/><br/>
<ProgressBar value={75} size="lg" theme="primary" /> <br/><br/>
```

**ProgressBar with Label**
```js
<ProgressBar value={60} theme="primary" label="Loading data..." /> <br/><br/>
```

**ProgressBar with Percentage Display**
```js
<ProgressBar value={35} theme="primary" showPercentage={true} /> <br/><br/>
```

**ProgressBar with Different Percentage Positions**
```js
<ProgressBar value={60} theme="primary" showPercentage={true} percentagePosition="top" /> <br/><br/>
<ProgressBar value={60} theme="primary" showPercentage={true} percentagePosition="bottom" /> <br/><br/>
<ProgressBar value={60} theme="primary" showPercentage={true} percentagePosition="inside" /> <br/><br/>
```

**ProgressBar with Custom Percentage Text**
```js
<ProgressBar 
  value={45} 
  theme="info" 
  showPercentage={true} 
  percentageText="{value}% completed" 
/> <br/><br/>
```

**ProgressBar with Label and Percentage Display**
```js
<ProgressBar 
  value={80} 
  theme="success" 
  label="Upload progress" 
  showPercentage={true} 
/> <br/><br/>
```

**ProgressBar with Custom Max Value**
```js
<ProgressBar 
  value={150} 
  max={200} 
  theme="info" 
  label="Custom max (150/200)" 
  showPercentage={true} 
/> <br/><br/>
```

**Interactive ProgressBar Example**
```js
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
