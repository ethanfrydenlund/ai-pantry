import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '85vh',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100px',
  },
  headerText: {
    fontSize: '60px',
    margin: '0px',
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '200px',
    height: '35px',
    backgroundColor: '#00C9A7',
    border: '4px solid #00C9A7',
    borderRadius: '4px',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    transform: 'scale(1)', // Note: 'scale' should be 'transform'
    transition: 'transform 0.2s',
    marginTop: '15px',
    '&:hover': {
      backgroundColor: '#5C9D8B',
      border: '4px solid #5C9D8B',
      scale: 1.025,
    },
  },
  statusText: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#00C9A7',
  },
  input: {
    height: '30px',
    border: '3px solid #00C9A7',
    borderRadius: '4px',
    outline: 'none',
    fontSize: '14px',
    fontWeight: '600',
    color: 'gray',
  },
});

export default function login() {
  const classes = styles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [returnData, setReturnData] = React.useState("");
  const [creatingAccount, setCreatingAccount] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/pantry");
    }
  }, [session]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const switchToCreate = () => {
    setCreatingAccount(true);
  }

  async function createAccount() {
    try {
      const response = await fetch("https://www.ai-pantry.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status !== 201 && response.status !== 400) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      else if (response.status === 400) {
        setReturnData('Username already exists');
      } else {
        setReturnData(data);
        setCreatingAccount(false);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <h1 className={classes.headerText}>AI</h1>
        <Image src="/basketlogo.png" alt="logo" width="60" height="60" />
        <h1 className={classes.headerText}>Pantry</h1>
      </header>
      <div className={classes.loginContainer}>
        {!creatingAccount && <button className={classes.button} onClick={() => signIn()}>Sign in</button>}
        {creatingAccount && (
          <div className={classes.loginContainer}>
            <h1 style={{ color: '#00C9A7', marginBottom: '5px' }}>Username</h1>
            <input className={classes.input} type="text" id="username" name="username" onChange={handleUsernameChange} value={username} />
            <h1 style={{ color: '#00C9A7', marginBottom: '5px' }}>Password</h1>
            <input className={classes.input} type="password" id="password" name="password" onChange={handlePasswordChange} value={password} />
            <button className={classes.button} onClick={createAccount} >Submit</button>
          </div>
        )}
        {!creatingAccount && <button className={classes.button} onClick={switchToCreate} >Create Account</button>}
      </div>
      <h3 className={classes.statusText}>{returnData}</h3>
    </div>
  )
}