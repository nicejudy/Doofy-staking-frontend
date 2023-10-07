import "src/style.scss";

import { useMediaQuery } from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import {
  darkTheme as rainbowDarkTheme,
  lightTheme as rainbowLightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Messages from "src/components/Messages/Messages";
import { Providers } from "src/helpers/providers/Providers/Providers";
import { useGoogleAnalytics } from "src/hooks/useGoogleAnalytics";
import useTheme from "src/hooks/useTheme";
import { chains } from "src/hooks/wagmi";
import { loadAccountDetails } from "src/slices/AccountSlice";
import { loadAppDetails } from "src/slices/AppSlice";
import { AppDispatch } from "src/store";
import { dark as darkTheme } from "src/themes/dark.js";
import { girth as gTheme } from "src/themes/girth.js";
import { light as lightTheme } from "src/themes/light.js";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { useAccount, useConnect, useNetwork } from "wagmi";

import StakingThree from "src/pages/staking-3";
import Leaderboard from "src/pages/leaderboard";
import Contact from "src/pages/contact";

const PREFIX = "App";

const classes = {
  drawer: `${PREFIX}-drawer`,
  content: `${PREFIX}-content`,
  contentShift: `${PREFIX}-contentShift`,
  toolbar: `${PREFIX}-toolbar`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  notification: `${PREFIX}-notification`,
  navItemTitle: "NavItem-title",
  navItem: "link-container",
};

const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${classes.drawer}`]: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    // padding: "15px",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    marginLeft: drawerWidth,
    // marginTop: "-48.5px",
  },

  [`& .${classes.contentShift}`]: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },

  // necessary for content to be below app bar
  [`& .${classes.toolbar}`]: theme.mixins.toolbar,

  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
  },

  [`& .${classes.navItemTitle}`]: {
    paddingLeft: "32px!important",
  },

  [`& .${classes.navItem}`]: {
    backgroundColor: "transparent!important",
  },

  [`& .${classes.notification}`]: {
    marginLeft: "264px",
  },
}));

// 😬 Sorry for all the console logging
const DEBUG = false;

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// 🔭 block explorer URL
// const blockExplorer = targetNetwork.blockExplorer;

const drawerWidth = 0;
const transitionDuration = 969;
function App() {
  useGoogleAnalytics();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [theme, toggleTheme] = useTheme();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { address = "", isConnected } = useAccount();
  const { error: errorMessage } = useConnect();

  const { chain = { id: 5 } } = useNetwork();
  const provider = Providers.getStaticProvider(chain.id);


  const isSmallerScreen = useMediaQuery("(max-width: 1047px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  async function loadDetails(whichDetails: string) {
    // NOTE (unbanksy): If you encounter the following error:
    // Unhandled Rejection (Error): call revert exception (method="balanceOf(address)", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.4.0)
    // it's because the initial provider loaded always starts with networkID=1. This causes
    // address lookup on the wrong chain which then throws the error. To properly resolve this,
    // we shouldn't be initializing to networkID=1 in web3Context without first listening for the
    // network. To actually test rinkeby, change setnetworkID equal to 4 before testing.
    const loadProvider = provider;

    if (whichDetails === "app") {
      loadApp(loadProvider);
    }

    // don't run unless provider is a Wallet...
    if (whichDetails === "account" && address && isConnected) {
      loadAccount(loadProvider);
    }
  }

  const loadApp = useCallback(
    (loadProvider: any) => {
      dispatch(loadAppDetails({ provider: loadProvider }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [chain.id, address],
  );

  const loadAccount = useCallback(
    (loadProvider: any) => {
      dispatch(loadAccountDetails({ provider: loadProvider, address }));
    },
    [chain.id, address],
  );

  const [resetDate, setResetDate] = useState(0);
  const addressRef = useRef(address);

  useEffect(() => {
    if (!address && addressRef.current) {
      setResetDate(new Date().getTime());
    }
    addressRef.current = address;
  }, [address]);

  // The next 3 useEffects handle initializing API Loads AFTER wallet is checked
  //
  // this useEffect checks Wallet Connection & then sets State for reload...
  // ... we don't try to fire Api Calls on initial load because web3Context is not set yet
  // ... if we don't wait we'll ALWAYS fire API calls via JsonRpc because provider has not
  // ... been reloaded within App.
  useEffect(() => {
    loadDetails("app");
  }, []);

  // this useEffect picks up any time a user Connects via the button
  useEffect(() => {
    // don't load ANY details until wallet is Connected
    if (isConnected && provider) {
      loadDetails("account");
    }
  }, [isConnected, chain.id, provider, address]);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage.message);
  }, [errorMessage]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarExpanded(false);
  };

  const themeMode = theme === "light" ? lightTheme : theme === "dark" ? darkTheme : gTheme;

  useEffect(() => {
    if (isSidebarExpanded) handleSidebarClose();
  }, [location]);

  return (
    <StyledDiv>
      <RainbowKitProvider
        chains={chains}
        key={`rainbowkit-${resetDate}`}
        theme={
          theme === "dark"
            ? rainbowDarkTheme({ accentColor: "#676B74" })
            : rainbowLightTheme({ accentColor: "#E0E2E3", accentColorForeground: "#181A1D" })
        }
      >
        <ThemeProvider theme={themeMode}>
            <Toaster>{t => <Messages toast={t} />}</Toaster>
              <Suspense fallback={<div></div>}>
                <QueryParamProvider adapter={ReactRouter6Adapter}>
                  <Routes>
                    <Route path="/" element={<StakingThree />} />
                    <Route path="/staking-3" element={<StakingThree />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="*" element={<StakingThree />} />
                    {/* <Route path="/projects-list" element={<ProjectsList />} />
                    <Route path="/projects-classic-1" element={<ProjectsClassic />} />
                    <Route path="/projects-grid" element={<ProjectsGrid />} />
                    <Route path="/projects-calendar" element={<ProjectsCalendar />} />
                    <Route path="/projects-details-1" element={<ProjectDetails />} />
                    <Route path="/staking-3" element={<StakingThree />} />
                    <Route path="/login" element={<Signin />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/farming" element={<Farming />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/roadmap-details" element={<RoadmapDetails />} />
                    <Route path="/contact" element={<Contact />} /> */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                  </Routes>
                </QueryParamProvider>
              </Suspense>
        </ThemeProvider>
      </RainbowKitProvider>
    </StyledDiv>
  );
}

export default App;
