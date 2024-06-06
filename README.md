# Youbike Taiwan

The project provide Taiwan Taiwan government bicycle system (Youbike2.0) realtime data for user.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Feature

The project seperate to frontstage and backstage:

### Frontstage

- The user can view the latest news by carousel and borrow step from homepage
- The user can see the realtime data (including: districts, stop name, available bike number and total bike number) at the realtimepage
- By clicking on stop name, the platform will lead to more detail page about the stop. Clicking on "路線導覽" could allow users see the destination and duration between current location and the stop location (by walk).
- In statistics page user is allow to see the use of youbike each month and the top 10 popular station in Taipei
- In news page, user could see all the news currently take place.
- By clicking on title could lead to more detail page for the news
- In contact page, user could see the support center location in Taipei. He/She could also filled in the form that would be later replied by the admin
- The users could fill in the subscribe bar to subscribe the latest news

### Backstage

- Only admins are allowed to enter backstage. If login success, the page will lead to news-list page, else will stay at login page
- In news-list page admin could view, add, edit, delete news data.
- In feedback page admin could view user feedback send from frontstage contact page. After reply to the feedback, admins could delete the feedback
- The admins could see the subscriber list in user page and send the latest information for them.

## Getting Started

1. Clone the project to local, enter:

```
git clone https://github.com/tonia83731/youbike-taipei.git
```

2. Go into the project(cd), later enter to install npm:

```
npm install
```

3. Start the project by enter:

```
npm run dev
```

4. If you wish to end the project, enter:

```
ctrl + c
```

## Environment

- node @20.11.1
- next @14.1.0
- next-auth @4.24.6
- react @18
- react-chartjs-2 @5.2.0
- react-datepicker @6.1.0
- react-loader-spinner @6.1.6
- react-toastify @10.0.4
- chart.js @4.4.1
- chartjs-plugin-datalabels @2.2.0
- mongodb @6.3.0
- bcryptjs @2.4.3
- dayjs @1.11.10
- tailwindcss @3.3.0
- @react-google-maps/api @2.19.3
- @fortawesome/react-fontawesome @0.2.0
- @fortawesome/fontawesome-svg-core @6.5.1
- @fortawesome/free-brands-svg-icons @6.5.1
- @fortawesome/free-regular-svg-icons @6.5.1
- @fortawesome/free-solid-svg-icons @6.5.1

## Future Development

- Switch to MySQL, use aws or other platform to store image file
- Replace page router with app router
