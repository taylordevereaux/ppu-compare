// import React, { Component } from 'react';
// import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import PropTypes from 'prop-types';

// class DropDown extends Component {
//   constructor(props) {
//     super(props)
//     // this.state = {
//     //    isOpen: false,
//     //    unit: 'Litres'
//     // }
//   }
  
//   toggle = (e) => {
    
//     if (e.target.value !== this.props.value) {
//       !!this.props.onChange && this.props.onChange(e.target.value);
//     }

//     // let unit = e.target.value;
//     // this.setState((prevState) => {
//     //   return {
//     //     isOpen: !prevState.isOpen,
//     //     unit
//     //   };
//     // });
//   }

//   render() {
//     const items = this.props.items;
//     return (
//       <UncontrolledButtonDropdown toggle={this.toggle}>
//         <DropdownToggle caret color="secondary">
//           {this.props.text}
//         </DropdownToggle>
//         <DropdownMenu>
//           { items.map(x => (<DropdownItem key={x} value={x} >{x}</DropdownItem>)) }
//         </DropdownMenu>
//       </UncontrolledButtonDropdown>
//     );
//   }
// }

// DropDown.propTypes = {
//   text: PropTypes.string,
//   // value: PropTypes.oneOfType([
//   //   PropTypes.string,
//   //   PropTypes.number,
//   //   PropTypes.bool
//   // ]),
//   onChange: PropTypes.func.isRequired,
//   items: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
//     console.log('propValue: `' + propFullName + '`');
//   })
// }

// export default DropDown;