
const deleteFile = async (filename) => {
try {
const response = await fetch(`https://tsantabot.onrender.com/deleteFile/${filename}`, {
method: 'DELETE',
});


if (response.ok) {
document.getElementById('successMessage').style.display = 'block';
document.getElementById('errorMessage').style.display = 'none';
console.log('Déconnecté succès !');
} else {
document.getElementById('errorMessage').style.display = 'block';
document.getElementById('successMessage').style.display = 'none';
console.error('Déconnecté erreur id');
}
} catch (error) {
document.getElementById('errorMessage').style.display = 'block';
document.getElementById('successMessage').style.display = 'none';
console.error('Error:', error);
}
};


document.getElementById('deleteButton').addEventListener('click', () => {
const filename = document.getElementById('filename').value;
if (filename) {
deleteFile(filename);
} else {
document.getElementById('errorMessage').style.display = 'block';
document.getElementById('successMessage').style.display = 'none';
}
});
