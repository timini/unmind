import { connect } from 'react-redux';

import { mapStateToProps, mapDispatchToProps } from './props';
import { Insights as InsightsComponent } from './component';

export const Insights = connect(mapStateToProps, mapDispatchToProps)(
  InsightsComponent
);

export default Insights;
