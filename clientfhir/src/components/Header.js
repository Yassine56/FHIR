import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

export default function ButtonAppBar() {
	const classes = useStyles()
	let history = useHistory()
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Button onClick={() => history.push('/home')} color='inherit'>
						Home
					</Button>
					<Typography variant='h6' className={classes.title}>
						Go to Login
					</Typography>
					<Button onClick={() => history.push('/login')} color='inherit'>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
