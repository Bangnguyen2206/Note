import { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../utils/constants";
import { Badge, Menu, MenuItem } from "@mui/material";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";

const cache = new InMemoryCache();

const query = gql`
  subscription pushNotification {
    notification {
      message
    }
  }
`;

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: GRAPHQL_SUBSCRIPTION_ENDPOINT,

  // Provide some optional constructor fields
  //   name: "react-web-client",
  //   version: "1.3",
  //   queryDeduplication: false,
  //   defaultOptions: {
  //     watchQuery: {
  //       fetchPolicy: "cache-and-network",
  //     },
  //   },
});

export default function PushNotification() {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setNotification("");
    setInvisible(true);
  };

  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  };

  useEffect(() => {
    (async () => {
      const onNext = (data) => {
        setInvisible(false);

        const message = data?.data?.notification?.message;
        setNotification(message);
        console.log("[PUSH NOTIFICATION]", { data });
      };

      await new Promise((resolve, reject) => {
        console.log(reject.prototype);
        client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });
    })();
  }, []);

  return (
    <>
      <Badge
        color="error"
        variant="dot"
        invisible={invisible}
        overlap="circular"
        sx={{ "&:hover": { cursor: "pointer" }, ml: "5px" }}
      >
        <NotificationsIcon onClick={handleClick} sx={{ color: "#7D9D9C" }} />
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  );
}
