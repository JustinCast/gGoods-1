-include .env

VERSION ?= $(shell git rev-parse --short HEAD)
CURRENT_BRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

IMAGE_NAME_WEBAPP=ggoods-webapp
IMAGE_NAME_HAPI=ggoods-hapi
IMAGE_NAME_HASURA=ggoods-hasura
IMAGE_NAME_WALLET=ggoods-wallet

DOCKER_REGISTRY=eoscostarica506
SUBDIRS = webapp hapi hasura wallet

MAKE_ENV += DOCKER_REGISTRY VERSION IMAGE_NAME_WEBAPP IMAGE_NAME_HAPI IMAGE_NAME_WALLET IMAGE_NAME_HASURA

SHELL_EXPORT := $(foreach v,$(MAKE_ENV),$(v)='$($(v))')

ifneq ("$(wildcard .env)", "")
	export $(shell sed 's/=.*//' .env)
endif
