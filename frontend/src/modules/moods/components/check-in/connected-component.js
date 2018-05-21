import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './props';
import { CheckIn as CheckInComponent } from './component';

export const CheckIn = connect(mapStateToProps, mapDispatchToProps)(
  CheckInComponent
);

export default CheckIn;
