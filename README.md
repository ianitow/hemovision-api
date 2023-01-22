# hemovision-api

Probably, i will follow this model: (Yes, it is be weird bc i didn't follow any pattern xD) Edit to see formatted

User:
	_id
	firstName
	lastName
	email
	birthDate
	password
	socialToken:{
		type:
		acessToken
		idToken
	}
	
	isDisabled
	
	createAt
	lasUpdateAt



/posts/
/posts/{id}
Post
	ownerId : profile->Id
	image_uri:''
	description
	countViews
	countComments
	countPeoples
	viewed
	surveyPredict:{
		owner:{
			type:'Neutrophil',
		},
		AI:{
			answered:
			type:
			value:
		}
		users:{
			[typeBlood01]:{
				totalVotes:	
			}
			totalVotes:
		}
	}
	privacySettings:{
		canSee:'all',
		canPost:'nobody',
		canClassify:'followers'
	}
	createAt
	updateAt
	
/posts/{id}/comments/{id}/replies

PostComment
	ownerId : profile->Id
	comment:
	countLikes:
	countComments:
	createAt
	lastUpdateAt
	
	
Notifications
	owner_id: profile->id
	type: 'comment'
	post_id:
	createAt:
	lastUpdateAt:
	
/profile/1
/profile/1/achievements?page={x}&each=5
/profile/1/activities?page={x}&each=5
/profile/1/followers?page={x}&each=5
/profile/1/following?page={x}&each=5

UserProfile
	firstName
	lastName
	fullName
	avatar_uri
	ackground_uri
	jobDescription
	language:'pt-BR'
	countFollowers
	countFollowing
	countContributions
	countPoints
	socialContacts:{
		facebook:'https://facebook'
		linkedin:'https://llasdas'
	}
	lastAchievements:[
		{type:'500_FOLLOWERS_X1312',
		 message:'+50 Contribuições',
		 createAt:
		 lastUpdateAt:
		}
	]
	lastActivities:[
		{type:'comment',
		 message:'O usuário ${xxx} comentou na publicação YYY',
		 message_html:'O usuário <b>${xxx}</b> comentou na publicação YYY',
		 postId: postid
		 createAt:
		 lastUpdateAt:
		}
	]
	
