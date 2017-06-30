import React from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import {cyan600, pink600, purple600, orange600, yellow500, green500, red600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
//import SupervisorAccount from 'materila-ui/svg-icons/action/supervisor-account';

import AccountBox from 'material-ui/svg-icons/action/account-box'
import Face from 'material-ui/svg-icons/action/face';
import Assignment from 'material-ui/svg-icons/action/assignment';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import InfoBox from '../components/dashboard/InfoBox';
import NewOrders from '../components/dashboard/NewOrders';
import MonthlySales from '../components/dashboard/MonthlySales';
import BrowserUsage from '../components/dashboard/BrowserUsage';
import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import globalStyles from '../styles';
import Data from '../data';
// import App from './App.js';
import ajax from 'superagent';

// const DashboardPage = () => {
class DashboardPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        navDrawerOpen: false,
        message:'',
        totalNumOfUsers:0,
        totalNumOfAccounts:0,
        totalNumOfUserModels:0,
        totalFollowUpStatusCounts:0,
        totalNumOfThreads:0,
        maxPossibleNumOfFollowUp:0,
        totalValidRefreshTokens:0,
        date: moment()

      };
        this.dateChanged = this.dateChanged.bind(this);
    }
    dateChanged(d){
      this.setState({date: d});
    }

    componentWillMount() {
      let _this =this;
      ajax.get('http://52.7.123.186:8080/analysis/snapshot-views?start_date=2017-06-06&end_date=2017-06-06')
      .end((error, response) => {
        if (!error && response) {
          this.setState({ message: response.body });
          console.log("message>>>>",response.body);
          response.body.forEach(function(single){
            let totalNumOfUsers, differenceTotalNumOfUsers,  totalNumOfAccounts, totalFollowUpStatusCounts, totalNumOfThreads,

               totalNumOfFollowUpThreads ,differenceRefreshToken, maxPossibleNumOfFollowUp,totalValidRefreshTokens, totalNumOfUserModels;
            totalNumOfUsers=single.totalNumOfUsers;
            totalFollowUpStatusCounts = single.followUpStatusCounts.FOLLOWED_UP+single.followUpStatusCounts.IGNORED+single.followUpStatusCounts.IGNORED_BLACKLISTED+single.followUpStatusCounts.NO_ACTION+single.followUpStatusCounts.UNDEFINED;
            totalNumOfUserModels = single.totalNumOfUserModels;

            differenceTotalNumOfUsers = single.totalNumOfUsers;
            totalNumOfAccounts = single.totalNumOfAccounts.GMAIL+single.totalNumOfAccounts.GMAIL_CALENDAR+single.totalNumOfAccounts.SALESFORCE+single.totalNumOfAccounts.TWITTER;
            totalNumOfThreads = single.totalNumOfThreads;
            totalNumOfFollowUpThreads = single.totalNumOfFollowUpThreads;

            totalValidRefreshTokens = single.totalValidRefreshTokens;
            maxPossibleNumOfFollowUp = single.maxPossibleNumOfFollowUp;
            differenceRefreshToken = single.maxPossibleNumOfFollowUp;

            _this.setState({totalNumOfUsers:totalNumOfUsers});
            _this.setState({totalNumOfAccounts:totalNumOfAccounts});
            _this.setState({totalNumOfUserModels:totalNumOfUserModels});
            _this.setState({totalFollowUpStatusCounts:totalFollowUpStatusCounts});
            _this.setState({totalNumOfThreads:totalNumOfThreads});
            _this.setState({maxPossibleNumOfFollowUp:maxPossibleNumOfFollowUp});
            _this.setState({totalValidRefreshTokens:totalValidRefreshTokens});


          });
        }
      }
    );
    }
render() {

let { totalNumOfUsers,totalNumOfAccounts,totalNumOfUserModels,totalFollowUpStatusCounts,totalNumOfThreads,maxPossibleNumOfFollowUp,totalValidRefreshTokens} = this.state;


// const paddingLeftDrawerOpen = 236;

  return (
    <div>

    <div id="app" style={globalStyles.navigation}>

      <DatePicker selected={this.state.date}
                  onChange={this.dateChanged} />
    </div>

    <div className="row">


    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={ExitToApp}
    color={pink600}
    title="Marked as FollowUp"
    value={totalFollowUpStatusCounts}
    />
    </div>


    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={Assignment}
    color={cyan600}
    title="Email Threads"
    value={totalNumOfThreads}
    />
    </div>

    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={Assessment}
    color={purple600}
    title="Accounts"
    value={totalNumOfAccounts}
    />
    </div>

    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={Face}
    color={orange600}
    title="Users"
    value={totalNumOfUsers}
    />
    </div>

    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={Face}
    color={red600}
    title="Candidate Threads"
    value={maxPossibleNumOfFollowUp}
    />
    </div>


    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={AccountBox}
    color={yellow500}
    title="User Models Built"
    value={totalNumOfUserModels+"/"+totalNumOfUsers}
    />
    </div>

    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
    <InfoBox Icon={Bookmark}
    color={green500}
    title="Refresh Token Valid"
    value={totalValidRefreshTokens+"/"+totalNumOfAccounts}
    />
    </div>



    </div>


    </div>
  );
}

}
// ReactDOM.render(< DashboardPage />, document.getElementById('app'));

export default DashboardPage;
