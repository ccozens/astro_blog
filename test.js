const platform = ['github', 'linkedin'];
const username = ['ccozens', 'in/chris-cozens-b2883a45/'];

platform.forEach((platform, index) => console.log(platform, username[index]))




platform.forEach((platform, index) => console.log(`<a href={https://www.${platform}.com/${username[index]}}>{platform}</a>`))
