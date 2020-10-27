import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
})

const Patients = () => {
	let [patient, setPatient] = useState()
	const classes = useStyles()
	const bull = <span className={classes.bullet}>•</span>
	let patientId = '533df6c4fc66'
	useEffect(() => {
		const fetchClientIdAndSecret = async () => {
			const res = await axios.get(`/api/fhir/patient/${patientId}`)
			let patientResponse = res.data.response
			setPatient(patientResponse)
		}
		fetchClientIdAndSecret()
	}, [])
	console.log('patient', patient)
	return (
		<div>
			{patient ? (
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Ressource Type : {patient.ressourceType}
						</Typography>
						<Typography variant='h5' component='h2'>
							{patient.entry[0].fullUrl}
						</Typography>
						<Typography className={classes.pos} color='textSecondary'>
							Gender : {patient.entry[0].resource.gender}
						</Typography>
						<Typography variant='body2' component='p'>
							Id : {patient.entry[0].resource.id}
							<br />
						</Typography>
					</CardContent>
					<CardActions>
						<Button size='small'>Learn More</Button>
					</CardActions>
				</Card>
			) : (
				<h1>patients component </h1>
			)}{' '}
		</div>
	)
}
export default Patients
