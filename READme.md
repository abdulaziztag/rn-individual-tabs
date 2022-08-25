# rn-individual-tabs

Easy to use individual tab component for React-native and expo apps.
<br>
![example](/example.gif)
## Installation

```
#npm
npm i rn-individual-tabs
#yarn
yarn add rn-individual-tabs
```
Then, import with:
```
import Tabs from 'rn-individual-tabs'
```

## Usage

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Example
>! ```tabs``` length must be equal to ```els``` length
``` 
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Tabs from '../UI/Tabs';  
import Login from '../components/Login';  
import Registration from '../components/Registration';  
  
export default function AccountScreen() {  
  
 return (  
  <View style={styles.container}>  
   <Tabs  
    tabs={['Login', 'Register']}  
    els={[  
     () => (<Login/>),
     () => (<Registration/>),
    ]}  
   />  
  </View>  
 );  
}  
  
const styles = StyleSheet.create({  
 container: {  
  flex: 1,  
  alignItems: 'center',  
  justifyContent: 'center',  
 }, 
});
```

## Props
| Prop        | Required? | Type                         | Description                                                                                                                                     |
| ----------- | --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `tabs`   | true     | string[]                      | Tab headers title                                                                                                                 |
| `els` | true     | FC[] (Functional component)                       | Content of tabs container (must be equal length with ```tabs``` prop) |
| `dividerColor`  | false     | string | Color of divider|
| `tabsColor`     | false     | string | Background color of tabs header |
|     ```contentColor```   | false     | string | Background color of tabs container|
|  ```tabsTextColor```   | false     | string | Text color of tabs header|                                                