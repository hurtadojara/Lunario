import React, {ReactNode, SyntheticEvent} from 'react';
import ApiCalendar from 'react-google-calendar-api';

class Oauth extends React.Component {
    constructor(props) {
      super(props);
      this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(event: SyntheticEvent<any>, name: string): void {
      if (name === 'sign-in') {
        ApiCalendar.handleAuthClick();
      } else if (name === 'sign-out') {
        ApiCalendar.handleSignoutClick();
      }
    }

    render() {
      return (
        <div>
            <button
                onClick={(e) => this.handleItemClick(e, 'sign-in')}
            >
              sign-in
            </button>
            <button
                onClick={(e) => this.handleItemClick(e, 'sign-out')}
            >
              sign-out
            </button>
            </div>
        );
    }
}
export default Oauth