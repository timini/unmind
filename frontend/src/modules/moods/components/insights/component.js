import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { propTypes, defaultProps } from './props';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import FaSmile from 'react-icons/lib/fa/smile-o';
import FaMeh from 'react-icons/lib/fa/meh-o';
import FaFrown from 'react-icons/lib/fa/frown-o';

export class Insights extends PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  constructor(props) {
    super(props);
    this.props.init();
    this.toggleExpand = this.toggleExpand.bind(this);
  }
  toggleExpand(event) {
    const { id } = event.target.dataset;
    this.props.toggle(parseInt(id, 10));
  }
  renderCheckin({ id, mood, feeling, comment, created_at }) {
    const createdAt = new Date(created_at);
    const isExpanded = this.props.expanded[id];
    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    const faces = {
      '1': <FaFrown/>,
      '2': <FaFrown/>,
      '3': <FaMeh/>,
      '4': <FaMeh/>,
      '5': <FaMeh/>,
      '6': <FaSmile/>,
      '7': <FaSmile/>,
    }
    return (
      <div className="w-100 bg-white ma1 cf" key={id}>
        <div className="cf">
          <div className="ph4 pv3 fl w-20">
            <div className="tc">
              <div className="f3">{createdAt.getUTCDate()}</div>
              <div className="">{months[createdAt.getUTCMonth()]}</div>
            </div>
          </div>
          <div className="ph4 pv3 fl w-20">time</div>
          <div className="ph4 pv3 fr w-20" onClick={this.toggleExpand} data-id={id}>
            {isExpanded
              ? <FaAngleDown />
              : <FaAngleUp />}
          </div>
          <div className="ph4 pv3 fr w-20 f2">{faces[mood]}</div>
        </div>
        {isExpanded ? (
          <div className='ph4 pv3 fl w-20'>
            {feeling}
            {comment}
          </div>
        ) : null}
      </div>
    );
  }
  render() {
    const { isLoading, checkins, averageMood } = this.props;
    if (isLoading) {
      return <div>loading..</div>;
    }
    if (checkins.length < 1) {
      return (
        <div>
          no check-ins yet, time to <Link to="/check-in">make one</Link>?
        </div>
      );
    }
    const radius = 80;
    const circum = 2 * Math.PI * radius;
    const segment = circum / 100 * averageMood;
    return (
      <div className="cf pa3 mw9 center">
        <div className="cf bg-white ma1 w-100">
          <div className="w-50 fl">
            <svg className="fr" width="300" height="300">
              <circle
                style={{
                  fill: '#757575',
                  stroke: '#2eb4b7',
                  strokeWidth: 35,
                  strokeDasharray: `${segment} ${circum}`,
                }}
                r={`${radius}`}
                cx="180"
                cy="150"
              />
              <circle
                style={{
                  fill: 'white',
                }}
                r={`${radius - 17}`}
                cx="180"
                cy="150"
              />
            </svg>
          </div>
          <div className="w-50 fl pa4" style={{ height: '200px' }}>
            <div className="dib v-mid">
              <div className="f1" style={{ color: '#2eb4b7' }}>
                {averageMood}%
              </div>
              <div className="measure-narrow">
                based on {checkins.length} entries
              </div>
            </div>
          </div>
        </div>
        {this.props.checkins.map(ci => this.renderCheckin(ci))}
      </div>
    );
  }
}

export default Insights;
