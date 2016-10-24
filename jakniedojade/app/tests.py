from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from .factory import ConnectionFactory, VoteFactory


# Create your tests here.


class ConnectionTestCase(APITestCase):

    def test_no_vote_count(self):
        connection = ConnectionFactory()
        url = reverse('connection-detail', kwargs={"pk":connection.id})
        response = self.client.get(url).json()
        self.assertEqual(response['vote_count'], 0)

    def test_vote_count(self):
        connection = ConnectionFactory()
        url = reverse('connection-detail', kwargs={"pk":connection.id})
        # Cast 5 votes
        VoteFactory.create_batch(size=5, connection=connection)
        response = self.client.get(url).json()
        self.assertEqual(response['vote_count'], 5)


class VoteTestCase(APITestCase):

    def test_no_vote_created(self):
        connection = ConnectionFactory()
        url = reverse('add-vote', kwargs={'connection_id': connection.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)


    def test_casting_vote(self):
        connection = ConnectionFactory()
        url = reverse('add-vote', kwargs={'connection_id': connection.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(connection.votes.count(), 1)

    def test_deleting_vote(self):
        connection = ConnectionFactory()
        url = reverse('add-vote', kwargs={'connection_id': connection.id})
        vote = VoteFactory(connection=connection)
        response = self.client.delete(url, REMOTE_ADDR=vote.ip)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(connection.votes.count(), 0)

        response = self.client.delete(url, REMOTE_ADDR=vote.ip)

        self.assertEqual(response.status_code, 404)
