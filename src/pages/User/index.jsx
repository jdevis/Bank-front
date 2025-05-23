import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetProfileQuery, useUpdateProfileMutation } from '../../app/api/apiSlice'

import models from '../../common/models.js';
import Card from '../../components/Card';
import './_user.scss';

const User = () => {
  const navigate = useNavigate();
  const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState('');
  const { accounts } = models

  useEffect(() => {
    if (profile) {
      setFirstname(profile.firstName);
      setLastname(profile.lastName);
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      console.error("Erreur de chargement du profil, redirection vers NotFound.");
      navigate("/error");
    }
  }, [error, navigate]);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancelClick = useCallback(() => {
    setIsEditing(false);
    setHasChanges(false);
    setFirstname(profile?.firstName || '');
    setLastname(profile?.lastName || '');
  }, [profile]);

  const handleUpdateProfile = useCallback(async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess('');

    try {
      const updatedData = { firstName: firstname, lastName: lastname };
      await updateProfile(updatedData).unwrap();

      setSuccess('Profil mis à jour avec succès');
      setIsEditing(false);
      setHasChanges(false);

      refetch();
    } catch (err) {
      console.error('Erreur mise à jour du profil :', err);
      setErrorMsg('Erreur lors de la mise à jour du profil utilisateur');
    }
  }, [firstname, lastname, updateProfile, refetch]);

  if (isLoading) return <p>Chargement du profil...</p>;

  return (
    <main className='main bg-dark'>
      <div className='header'>
        <h1>Welcome back<br />{profile?.firstName} {profile?.lastName}</h1>
        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="edit-form-inputs">
              <input
                id="first-name"
                label=""
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  setHasChanges(true);
                }}
                placeholder="Prénom"
                autoComplete="given-name"
              />
              <input
                id="last-name"
                label=""
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                  setHasChanges(true);
                }}
                placeholder="Nom"
                autoComplete="family-name"
              />
            </div>

            <div className='edit-form-buttons'>
              <button type="submit" className='save-button'>Save</button>
              <button className="cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
            </div>

            {errorMsg && <p className="error-message">{errorMsg}</p>}
          </form>
        ) : (
          <>
            {success && <p className="success-message">{success}</p>}
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}

      </div>
      <h2 className='sr-only'>Accounts</h2>
      {accounts.map((account, index) => (
        <Card
          key={index}
          amount={account.amount}
          title={account.title}
          desc={account.description}
          icon=''
        />
      ))}
    </main>
  )
}
export default User
